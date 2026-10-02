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
$mailboxPath = [System.Uri]::EscapeDataString($Mailbox)
$messagesUri = "https://graph.microsoft.com/v1.0/users/$mailboxPath/mailFolders/inbox/messages?`$select=receivedDateTime,from,subject&`$orderby=receivedDateTime desc&`$top=10"
$clientSecretPlainText = [System.Net.NetworkCredential]::new('', $ClientSecret).Password

try {
    $tokenResponse = Invoke-RestMethod -Method Post -Uri $tokenUri -ContentType 'application/x-www-form-urlencoded' -Body @{
        client_id     = $ClientId
        client_secret = $clientSecretPlainText
        scope         = 'https://graph.microsoft.com/.default'
        grant_type    = 'client_credentials'
    } -ErrorAction Stop
}
finally {
    $clientSecretPlainText = $null
}

$response = Invoke-RestMethod -Method Get -Uri $messagesUri -Headers @{
    Authorization = "Bearer $($tokenResponse.access_token)"
} -ErrorAction Stop

$response.value |
    Where-Object { $null -eq $_.'@odata.type' -or $_.'@odata.type' -eq '#microsoft.graph.message' } |
    ForEach-Object {
    [pscustomobject]@{
        ReceivedDateTime = ([datetimeoffset]$_.receivedDateTime).UtcDateTime
        From             = $_.from.emailAddress.name
        Subject          = $_.subject
    }
}