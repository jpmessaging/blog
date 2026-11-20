[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [string]$TenantId,

    [Parameter(Mandatory)]
    [string]$ClientId,

    [Parameter(Mandatory)]
    [securestring]$ClientSecret,

    [Parameter(Mandatory)]
    [string]$Mailbox
)

$tokenUri = "https://login.microsoftonline.com/$TenantId/oauth2/v2.0/token"
$ewsUri = "https://outlook.office365.com/EWS/Exchange.asmx"
$clientSecretPlainText = [System.Net.NetworkCredential]::new('', $ClientSecret).Password

try {
    $tokenResponse = Invoke-RestMethod -Method Post -Uri $tokenUri -ContentType 'application/x-www-form-urlencoded' -Body @{
        client_id     = $ClientId
        client_secret = $clientSecretPlainText
        scope         = 'https://outlook.office365.com/.default'
        grant_type    = 'client_credentials'
    } -ErrorAction Stop
}
finally {
    $clientSecretPlainText = $null
}

$mailboxXml = [System.Security.SecurityElement]::Escape($Mailbox)
$soapRequest = @"
<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:t="http://schemas.microsoft.com/exchange/services/2006/types"
               xmlns:m="http://schemas.microsoft.com/exchange/services/2006/messages">
  <soap:Header>
    <t:RequestServerVersion Version="Exchange2016" />
    <t:ExchangeImpersonation>
      <t:ConnectingSID>
        <t:PrimarySmtpAddress>$mailboxXml</t:PrimarySmtpAddress>
      </t:ConnectingSID>
    </t:ExchangeImpersonation>
  </soap:Header>
  <soap:Body>
    <m:FindItem Traversal="Shallow">
      <m:ItemShape>
        <t:BaseShape>IdOnly</t:BaseShape>
        <t:AdditionalProperties>
          <t:FieldURI FieldURI="item:DateTimeReceived" />
          <t:FieldURI FieldURI="message:From" />
          <t:FieldURI FieldURI="item:Subject" />
        </t:AdditionalProperties>
      </m:ItemShape>
      <m:IndexedPageItemView MaxEntriesReturned="10" Offset="0" BasePoint="Beginning" />
      <m:SortOrder>
        <t:FieldOrder Order="Descending">
          <t:FieldURI FieldURI="item:DateTimeReceived" />
        </t:FieldOrder>
      </m:SortOrder>
      <m:ParentFolderIds>
        <t:DistinguishedFolderId Id="inbox">
          <t:Mailbox>
            <t:EmailAddress>$mailboxXml</t:EmailAddress>
          </t:Mailbox>
        </t:DistinguishedFolderId>
      </m:ParentFolderIds>
    </m:FindItem>
  </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest -Method Post -Uri $ewsUri -Headers @{
    Authorization     = "Bearer $($tokenResponse.access_token)"
    'X-AnchorMailbox' = $Mailbox
} -ContentType 'text/xml; charset=utf-8' -Body $soapRequest -ErrorAction Stop

[xml]$responseXml = $response.Content
$namespaceManager = [System.Xml.XmlNamespaceManager]::new($responseXml.NameTable)
$namespaceManager.AddNamespace('m', 'http://schemas.microsoft.com/exchange/services/2006/messages')
$namespaceManager.AddNamespace('t', 'http://schemas.microsoft.com/exchange/services/2006/types')

$responseMessage = $responseXml.SelectSingleNode('//m:FindItemResponseMessage', $namespaceManager)
$responseCode = $responseMessage.SelectSingleNode('m:ResponseCode', $namespaceManager).InnerText
if ($responseCode -ne 'NoError') {
    $messageText = $responseMessage.SelectSingleNode('m:MessageText', $namespaceManager).InnerText
    throw "EWS FindItem failed: $responseCode - $messageText"
}

$responseXml.SelectNodes('//t:Items/t:Message', $namespaceManager) | ForEach-Object {
    $fromNode = $_.SelectSingleNode('t:From/t:Mailbox/t:Name', $namespaceManager)
    $subjectNode = $_.SelectSingleNode('t:Subject', $namespaceManager)
    $receivedDateTimeNode = $_.SelectSingleNode('t:DateTimeReceived', $namespaceManager)

    [pscustomobject]@{
        ReceivedDateTime = [datetimeoffset]::Parse($receivedDateTimeNode.InnerText).UtcDateTime
        From             = $fromNode.InnerText
        Subject          = $subjectNode.InnerText
    }
}