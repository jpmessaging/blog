'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const yaml = require('js-yaml');

const POSTS_DIRECTORY = 'source/_posts';
const TRANSLATION_PREFIX = '※ この記事は、[';
const TRANSLATION_SUFFIX =
  ' の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。';
const TRANSLATION_NOTE_PATTERN =
  /^※ この記事は、\[([^\]\r\n]+)\]\((https?:\/\/[^\s<>\r\n]+)\) の抄訳です。最新の情報はリンク先をご確認ください。この記事は Microsoft 365 Copilot および GitHub Copilot を使用して抄訳版の作成が行われています。$/;
const TRANSLATION_SOURCE_PATTERN =
  /^※ この記事は、\[([^\]\r\n]+)\]\((https?:\/\/[^\s<>\r\n]+)\) の抄訳です。/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DATETIME_PATTERN = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
const FILE_NAME_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/;
const HALF_WIDTH_KATAKANA_PATTERN = /[\uFF61-\uFF9F]/u;
const FULL_WIDTH_PUNCTUATION_PATTERN = /[（）：]/u;
const LOCALE_SEGMENT_PATTERN = /^\/[a-z]{2}-[a-z]{2}(?:\/|$)/i;

function lineNumberAt(text, index) {
  return text.slice(0, index).split('\n').length;
}

function addError(errors, file, line, message, fix) {
  errors.push({ file: file.replaceAll('\\', '/'), line, message, fix });
}

function parseFrontMatter(content) {
  const normalized = content.replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
  if (!normalized.startsWith('---\n')) {
    return { error: 'YAML front matter がありません。', body: normalized, bodyStartLine: 1 };
  }

  const closingIndex = normalized.indexOf('\n---', 4);
  if (closingIndex < 0 || !/^---[ \t]*(?:\n|$)/.test(normalized.slice(closingIndex + 1))) {
    return { error: 'YAML front matter の終端 `---` がありません。', body: normalized, bodyStartLine: 1 };
  }

  const closingLineEnd = normalized.indexOf('\n', closingIndex + 1);
  const bodyIndex = closingLineEnd < 0 ? normalized.length : closingLineEnd + 1;
  const source = normalized.slice(4, closingIndex + 1);

  try {
    const data = yaml.load(source, { schema: yaml.FAILSAFE_SCHEMA });
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return {
        error: 'YAML front matter はキーと値の組み合わせで記載してください。',
        body: normalized.slice(bodyIndex),
        bodyStartLine: lineNumberAt(normalized, bodyIndex)
      };
    }
    return {
      data,
      body: normalized.slice(bodyIndex),
      bodyStartLine: lineNumberAt(normalized, bodyIndex)
    };
  } catch (error) {
    return {
      error: `YAML front matter を解析できません: ${error.reason || error.message}`,
      body: normalized.slice(bodyIndex),
      bodyStartLine: lineNumberAt(normalized, bodyIndex)
    };
  }
}

function firstContentLine(body, bodyStartLine) {
  const lines = body.split('\n');
  const index = lines.findIndex((line) => line.trim() !== '');
  if (index < 0) {
    return { text: '', line: bodyStartLine };
  }
  return { text: lines[index].trim(), line: bodyStartLine + index };
}

function extractTranslationNote(content) {
  const frontMatter = parseFrontMatter(content);
  const candidate = firstContentLine(frontMatter.body, frontMatter.bodyStartLine);
  const match = candidate.text.match(TRANSLATION_NOTE_PATTERN);
  return match
    ? { title: match[1], url: match[2], line: candidate.line }
    : null;
}

function extractTranslationSource(content) {
  const frontMatter = parseFrontMatter(content);
  const candidate = firstContentLine(frontMatter.body, frontMatter.bodyStartLine);
  const match = candidate.text.match(TRANSLATION_SOURCE_PATTERN);
  return match
    ? { title: match[1], url: match[2], line: candidate.line }
    : null;
}

function isTranslationArticle(content) {
  const frontMatter = parseFrontMatter(content);
  return firstContentLine(frontMatter.body, frontMatter.bodyStartLine).text.startsWith(
    TRANSLATION_PREFIX
  );
}

function isRealDate(value, allowTime) {
  const pattern = allowTime ? DATETIME_PATTERN : DATE_PATTERN;
  if (typeof value !== 'string' || !pattern.test(value)) {
    return false;
  }

  const [datePart, timePart] = value.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return false;
  }

  if (timePart) {
    const [hour, minute] = timePart.split(':').map(Number);
    return hour <= 23 && minute <= 59;
  }
  return true;
}

function validateFrontMatter(file, frontMatter, errors) {
  if (frontMatter.error) {
    addError(errors, file, 1, frontMatter.error, '記事の先頭に有効な YAML front matter を追加してください。');
    return;
  }

  const { data } = frontMatter;
  if (typeof data.title !== 'string' || data.title.trim() === '') {
    addError(errors, file, 2, '`title` がありません。', '空でない記事タイトルを指定してください。');
  }
  if (!isRealDate(data.date, true) && !isRealDate(data.date, false)) {
    addError(
      errors,
      file,
      2,
      '`date` の形式が正しくありません。',
      '`YYYY-MM-DD` または `YYYY-MM-DD HH:mm` で指定してください。'
    );
  }
  if (Object.hasOwn(data, 'lastupdate') && !isRealDate(data.lastupdate, false)) {
    addError(
      errors,
      file,
      2,
      '`lastupdate` の形式が正しくありません。',
      '`YYYY-MM-DD` で指定するか、フィールドを削除してください。'
    );
  }
  if (!Array.isArray(data.tags) || data.tags.length === 0 || data.tags.some((tag) => typeof tag !== 'string' || tag.trim() === '')) {
    addError(
      errors,
      file,
      2,
      '`tags` は空でない配列にする必要があります。',
      '`tags:` の下に 1 つ以上のタグを `- タグ名` 形式で追加してください。'
    );
  }
}

function linesOutsideCode(body, bodyStartLine) {
  const result = [];
  let fence = null;
  for (const [index, line] of body.split('\n').entries()) {
    const fenceMatch = line.match(/^\s*(`{3,}|~{3,})(.*)$/);
    if (fenceMatch) {
      const marker = fenceMatch[1][0];
      if (!fence) {
        fence = { marker, length: fenceMatch[1].length };
      } else if (
        fence.marker === marker &&
        fenceMatch[1].length >= fence.length &&
        fenceMatch[2].trim() === ''
      ) {
        fence = null;
      }
      continue;
    }
    if (!fence) {
      result.push({ text: line, line: bodyStartLine + index });
    }
  }
  return result;
}

function stripInlineCode(line) {
  let result = '';
  for (let index = 0; index < line.length; index += 1) {
    if (line[index] !== '`') {
      result += line[index];
      continue;
    }

    let runLength = 1;
    while (line[index + runLength] === '`') {
      runLength += 1;
    }
    const delimiter = '`'.repeat(runLength);
    let closingIndex = line.indexOf(delimiter, index + runLength);
    while (
      closingIndex >= 0 &&
      (line[closingIndex - 1] === '`' || line[closingIndex + runLength] === '`')
    ) {
      closingIndex = line.indexOf(delimiter, closingIndex + runLength);
    }
    if (closingIndex < 0) {
      break;
    }
    index = closingIndex + runLength - 1;
  }
  return result;
}

function stripHtmlTags(line) {
  let result = '';
  for (let index = 0; index < line.length; index += 1) {
    if (line[index] !== '<' || !/[A-Za-z!?/]/.test(line[index + 1] || '')) {
      result += line[index];
      continue;
    }

    let quote = null;
    let closingIndex = -1;
    for (let cursor = index + 1; cursor < line.length; cursor += 1) {
      if (quote) {
        if (line[cursor] === quote) {
          quote = null;
        }
      } else if (line[cursor] === '"' || line[cursor] === "'") {
        quote = line[cursor];
      } else if (line[cursor] === '>') {
        closingIndex = cursor;
        break;
      }
    }
    if (closingIndex < 0) {
      break;
    }
    index = closingIndex;
  }
  return result;
}

function stripInlineCodeAndHtml(line) {
  return stripHtmlTags(stripInlineCode(line)).replace(/https?:\/\/[^\s<>"')\]]+/gi, '');
}

function extractUrls(line) {
  const withoutInlineCode = stripInlineCode(line);
  return [...withoutInlineCode.matchAll(/https?:\/\/[^\s<>"')\]]+/gi)].map((match) => ({
    url: match[0].replace(/[.,;:!?]+$/u, ''),
    column: match.index
  }));
}

function localImageTargets(line) {
  const targets = [];
  const markdownPattern = /!\[[^\]]*\]\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+["'][^"']*["'])?\s*\)/g;
  for (const match of line.matchAll(markdownPattern)) {
    targets.push(match[1] || match[2]);
  }
  const htmlPattern = /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["'][^>]*>/gi;
  for (const match of line.matchAll(htmlPattern)) {
    targets.push(match[1]);
  }
  const assetTagPattern = /\{%\s*asset_img\s+((?:"[^"]+")|(?:'[^']+')|(?:\S+))/g;
  for (const match of line.matchAll(assetTagPattern)) {
    targets.push(match[1].replace(/^(['"])(.*)\1$/, '$2'));
  }
  return targets;
}

function validateImage(file, line, target, root, errors) {
  if (/^(?:https?:)?\/\//i.test(target) || /^(?:data:|#)/i.test(target)) {
    return;
  }

  const cleanTarget = target.split(/[?#]/, 1)[0].replaceAll('\\', '/');
  let decodedTarget;
  try {
    decodedTarget = decodeURIComponent(cleanTarget);
  } catch {
    addError(errors, file, line, `画像パスをデコードできません: ${target}`, '有効な相対パスに修正してください。');
    return;
  }

  const articleSlug = path.posix.basename(file, '.md');
  const segments = decodedTarget.replace(/^\.\//, '').split('/');
  if (
    decodedTarget.startsWith('/') ||
    /^[a-z]:/i.test(decodedTarget) ||
    segments.includes('..')
  ) {
    addError(
      errors,
      file,
      line,
      `画像が記事アセット フォルダー外を参照しています: ${target}`,
      `画像を ${POSTS_DIRECTORY}/${articleSlug}/ に置き、ファイル名または記事フォルダーからの相対パスで参照してください。`
    );
    return;
  }

  let assetRelativePath;
  if (segments.length === 1) {
    assetRelativePath = segments[0];
  } else if (segments[0] === articleSlug) {
    assetRelativePath = segments.slice(1).join('/');
  } else {
    addError(
      errors,
      file,
      line,
      `画像が記事アセット フォルダーの配置規約に従っていません: ${target}`,
      `画像を ${POSTS_DIRECTORY}/${articleSlug}/ に移し、参照を修正してください。`
    );
    return;
  }

  const expectedPath = path.join(root, POSTS_DIRECTORY, articleSlug, ...assetRelativePath.split('/'));
  if (!fs.existsSync(expectedPath) || !fs.statSync(expectedPath).isFile()) {
    addError(
      errors,
      file,
      line,
      `ローカル画像が見つかりません: ${target}`,
      `画像ファイルを ${POSTS_DIRECTORY}/${articleSlug}/ に追加してください。`
    );
  }
}

function validateBody(file, frontMatter, root, errors) {
  const noteLine = firstContentLine(frontMatter.body, frontMatter.bodyStartLine);
  const noteMatch = noteLine.text.match(TRANSLATION_NOTE_PATTERN);
  if (!noteMatch) {
    addError(
      errors,
      file,
      noteLine.line,
      'フロント マター直後の抄訳注釈が規定の形式と一致しません。',
      `注釈を「${TRANSLATION_PREFIX}原文タイトル](https://...)${TRANSLATION_SUFFIX}」形式で記載してください。`
    );
  } else {
    try {
      const url = new URL(noteMatch[2]);
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('unsupported protocol');
      }
    } catch {
      addError(
        errors,
        file,
        noteLine.line,
        '抄訳注釈の原文 URL が有効ではありません。',
        '有効な http または https URL を指定してください。'
      );
    }
  }

  for (const item of linesOutsideCode(frontMatter.body, frontMatter.bodyStartLine)) {
    for (const { url } of extractUrls(item.text)) {
      try {
        const parsed = new URL(url);
        if (
          parsed.hostname.toLowerCase() === 'learn.microsoft.com' &&
          LOCALE_SEGMENT_PATTERN.test(parsed.pathname)
        ) {
          addError(
            errors,
            file,
            item.line,
            `Microsoft Learn URL にロケール セグメントが含まれています: ${url}`,
            'URL から `/ja-jp/` などのロケール セグメントを削除してください。'
          );
        }
      } catch {
        // Invalid non-source URLs are outside this check's conservative scope.
      }
    }

    for (const target of localImageTargets(item.text)) {
      validateImage(file, item.line, target, root, errors);
    }

    if (item.line === noteLine.line) {
      continue;
    }
    const prose = stripInlineCodeAndHtml(item.text);
    if (HALF_WIDTH_KATAKANA_PATTERN.test(prose)) {
      addError(
        errors,
        file,
        item.line,
        '半角カタカナが含まれています。',
        '全角カタカナに置き換えてください。'
      );
    }
    if (/(?:^|[^A-Za-z])Azure AD(?:$|[^A-Za-z])/u.test(prose)) {
      addError(
        errors,
        file,
        item.line,
        '禁止用語 `Azure AD` が本文に含まれています。',
        '`Microsoft Entra ID` に置き換えてください。'
      );
    }
    const punctuation = prose.match(FULL_WIDTH_PUNCTUATION_PATTERN);
    if (punctuation) {
      addError(
        errors,
        file,
        item.line,
        `全角記号 \`${punctuation[0]}\` が本文に含まれています。`,
        '半角の `(`、`)`、`:` を使用してください。'
      );
    }
  }
}

function normalizeSourceUrl(value) {
  const url = new URL(value);
  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();
  if ((url.protocol === 'https:' && url.port === '443') || (url.protocol === 'http:' && url.port === '80')) {
    url.port = '';
  }
  if (url.pathname.length > 1) {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }
  return url.href;
}

function findDuplicateSource(file, sourceUrl, root) {
  const postsRoot = path.join(root, POSTS_DIRECTORY);
  let normalizedSource;
  try {
    normalizedSource = normalizeSourceUrl(sourceUrl);
  } catch {
    return null;
  }
  for (const entry of fs.readdirSync(postsRoot, { withFileTypes: true })) {
    if (!entry.isFile() || path.extname(entry.name).toLowerCase() !== '.md') {
      continue;
    }
    const candidate = `${POSTS_DIRECTORY}/${entry.name}`;
    if (candidate === file.replaceAll('\\', '/')) {
      continue;
    }
    const content = fs.readFileSync(path.join(postsRoot, entry.name), 'utf8');
    const note = extractTranslationSource(content);
    if (note) {
      try {
        if (normalizeSourceUrl(note.url) === normalizedSource) {
          return candidate;
        }
      } catch {
        // Existing malformed URLs must not prevent validation of the changed article.
      }
    }
  }
  return null;
}

function validateFile(file, root, options = {}) {
  const errors = [];
  const normalizedFile = file.replaceAll('\\', '/');
  const absolutePath = path.join(root, ...normalizedFile.split('/'));
  const content = fs.readFileSync(absolutePath, 'utf8');
  if (!options.forceTranslation && !isTranslationArticle(content)) {
    return { checked: false, errors };
  }

  if (!FILE_NAME_PATTERN.test(path.posix.basename(normalizedFile))) {
    addError(
      errors,
      normalizedFile,
      1,
      'Markdown ファイル名が英小文字、数字、ハイフンのみのケバブケースではありません。',
      'ファイル名を `example-article.md` の形式に変更してください。'
    );
  }

  const frontMatter = parseFrontMatter(content);
  validateFrontMatter(normalizedFile, frontMatter, errors);
  validateBody(normalizedFile, frontMatter, root, errors);

  const note = extractTranslationNote(content);
  if (note) {
    const duplicate = findDuplicateSource(normalizedFile, note.url, root);
    if (duplicate) {
      addError(
        errors,
        normalizedFile,
        note.line,
        `同じ原文 URL を持つ記事が既に存在します: ${duplicate}`,
        '重複記事を作成せず、既存記事を更新してください。'
      );
    }
  }
  return { checked: true, errors };
}

function changedPostFiles(base, head, root) {
  return changedPostEntries(base, head, root).map((entry) => entry.file);
}

function changedPostEntries(base, head, root) {
  if (!base || !head) {
    throw new Error('`--base` と `--head` の両方を指定してください。');
  }
  for (const revision of [base, head]) {
    execFileSync('git', ['rev-parse', '--verify', `${revision}^{commit}`], {
      cwd: root,
      stdio: 'ignore'
    });
  }
  const output = execFileSync(
    'git',
    [
      'diff',
      '--name-status',
      '-z',
      '--diff-filter=AMR',
      `${base}...${head}`,
      '--',
      `${POSTS_DIRECTORY}/*.md`
    ],
    { cwd: root }
  );
  const fields = output.toString('utf8').split('\0').filter(Boolean);
  const entries = [];
  for (let index = 0; index < fields.length; ) {
    const status = fields[index++];
    if (status.startsWith('R')) {
      const baseFile = fields[index++];
      const file = fields[index++];
      entries.push({ status: 'R', baseFile, file });
    } else {
      const file = fields[index++];
      entries.push({ status, baseFile: status === 'A' ? null : file, file });
    }
  }
  return entries.filter((entry) =>
    fs.existsSync(path.join(root, ...entry.file.split('/')))
  );
}

function wasTranslationArticle(base, file, root) {
  if (!file) {
    return false;
  }
  try {
    const content = execFileSync('git', ['show', `${base}:${file}`], {
      cwd: root,
      encoding: 'utf8'
    });
    return isTranslationArticle(content);
  } catch {
    return false;
  }
}

function escapeWorkflowCommand(value) {
  return value.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
}

function reportErrors(errors) {
  for (const error of errors) {
    const message = `${error.message} 修正方針: ${error.fix}`;
    console.error(
      `::error file=${escapeWorkflowCommand(error.file)},line=${error.line}::${escapeWorkflowCommand(message)}`
    );
    console.error(`${error.file}:${error.line}: ${message}`);
  }
}

function parseArguments(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    if (argv[index] === '--base' || argv[index] === '--head') {
      options[argv[index].slice(2)] = argv[index + 1];
      index += 1;
    }
  }
  return options;
}

function main() {
  const root = process.cwd();
  const { base, head } = parseArguments(process.argv.slice(2));
  let files;
  try {
    files = changedPostEntries(base, head, root);
  } catch (error) {
    console.error(`変更記事を取得できませんでした: ${error.message}`);
    process.exitCode = 2;
    return;
  }

  const allErrors = [];
  let checkedCount = 0;
  for (const entry of files) {
    const forceTranslation = wasTranslationArticle(base, entry.baseFile, root);
    const result = validateFile(entry.file, root, { forceTranslation });
    if (result.checked) {
      checkedCount += 1;
      allErrors.push(...result.errors);
    }
  }

  if (allErrors.length > 0) {
    reportErrors(allErrors);
    console.error(`抄訳記事 ${checkedCount} 件から ${allErrors.length} 件のエラーが見つかりました。`);
    process.exitCode = 1;
    return;
  }
  console.log(`変更された Markdown ${files.length} 件のうち、抄訳記事 ${checkedCount} 件を検証しました。`);
}

module.exports = {
  TRANSLATION_SUFFIX,
  changedPostEntries,
  changedPostFiles,
  extractTranslationNote,
  isTranslationArticle,
  normalizeSourceUrl,
  parseFrontMatter,
  validateFile
};

if (require.main === module) {
  main();
}
