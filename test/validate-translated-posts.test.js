'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');
const {
  TRANSLATION_SUFFIX,
  changedPostFiles,
  normalizeSourceUrl,
  validateFile
} = require('../scripts/validate-translated-posts');

const SOURCE_URL = 'https://example.com/source/article/';

function article(overrides = {}) {
  const {
    title = 'テスト記事',
    date = '2026-09-11 11:00',
    lastupdate,
    tags = ['Exchange Online'],
    sourceTitle = 'Original article title',
    sourceUrl = SOURCE_URL,
    body = '正常な本文です。',
    note = `※ この記事は、[${sourceTitle}](${sourceUrl})${TRANSLATION_SUFFIX}`
  } = overrides;
  const tagsYaml = Array.isArray(tags)
    ? `tags:\n${tags.map((tag) => `- ${tag}`).join('\n')}`
    : `tags: ${tags}`;
  return [
    '---',
    `title: "${title}"`,
    `date: ${date}`,
    ...(lastupdate === undefined ? [] : [`lastupdate: ${lastupdate}`]),
    tagsYaml,
    '---',
    note,
    '',
    body,
    ''
  ].join('\n');
}

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'translation-validation-'));
  fs.mkdirSync(path.join(root, 'source', '_posts'), { recursive: true });
  return {
    root,
    write(file, content) {
      const absolutePath = path.join(root, ...file.split('/'));
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, content);
      return file;
    }
  };
}

function messages(result) {
  return result.errors.map((error) => error.message);
}

test('accepts a valid translated article and its local image', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/valid-article.md',
    article({ body: '![説明](image.png)\n\n[Learn](https://learn.microsoft.com/exchange/)' })
  );
  site.write('source/_posts/valid-article/image.png', 'image');

  assert.deepEqual(validateFile(file, site.root), { checked: true, errors: [] });
});

test('skips an ordinary Japanese article', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/ordinary-article.md',
    article({ note: '', body: 'Azure AD（旧名称）を説明します。' })
  );

  assert.deepEqual(validateFile(file, site.root), { checked: false, errors: [] });
});

test('validates a previously translated article after its note is removed', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/translated-before.md',
    article({ note: '', body: '注釈が削除された本文です。' })
  );
  const result = validateFile(file, site.root, { forceTranslation: true });

  assert.equal(result.checked, true);
  assert.match(messages(result).join('\n'), /抄訳注釈/);
});

test('reports malformed front matter and translation note without stopping early', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/Broken Article.md',
    ['---', 'title: [invalid', '---', `※ この記事は、[Original](${SOURCE_URL}) 不完全な注釈です。`, 'ﾃｽﾄ：Azure AD'].join('\n')
  );
  const result = validateFile(file, site.root);

  assert.equal(result.checked, true);
  assert.match(messages(result).join('\n'), /ファイル名/);
  assert.match(messages(result).join('\n'), /front matter を解析/);
  assert.match(messages(result).join('\n'), /抄訳注釈/);
  assert.match(messages(result).join('\n'), /半角カタカナ/);
  assert.match(messages(result).join('\n'), /Azure AD/);
  assert.match(messages(result).join('\n'), /全角記号/);
});

test('validates required front matter fields and exact dates', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/invalid-front-matter.md',
    article({ title: '', date: '2026-02-30', lastupdate: '2026/09/11', tags: [] })
  );
  const result = validateFile(file, site.root);

  assert.equal(result.errors.length, 4);
  assert.match(messages(result).join('\n'), /title/);
  assert.match(messages(result).join('\n'), /date/);
  assert.match(messages(result).join('\n'), /lastupdate/);
  assert.match(messages(result).join('\n'), /tags/);
});

test('requires the complete note immediately after front matter', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/bad-note.md',
    article({ note: `※ この記事は、[Original](${SOURCE_URL}) の抄訳です。` })
  );

  assert.match(messages(validateFile(file, site.root)).join('\n'), /抄訳注釈/);
});

test('reports an invalid source URL without crashing duplicate detection', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/invalid-source-url.md',
    article({ sourceUrl: 'https://%' })
  );

  assert.match(messages(validateFile(file, site.root)).join('\n'), /原文 URL/);
});

test('reports missing and misplaced local images but ignores external media', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/image-check.md',
    article({
      body: [
        '![](missing.png)',
        '![](../shared/outside.png)',
        '![](https://example.com/image.png)',
        '<img src="//cdn.example.com/image.png">',
        '<iframe src="https://example.com/video"></iframe>',
        '[anchor](#section)'
      ].join('\n')
    })
  );
  const result = validateFile(file, site.root);

  assert.equal(result.errors.length, 2);
  assert.match(messages(result).join('\n'), /見つかりません/);
  assert.match(messages(result).join('\n'), /フォルダー外/);
});

test('only rejects locale segments on Microsoft Learn URLs', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/learn-links.md',
    article({
      body: [
        '[localized](https://learn.microsoft.com/ja-jp/exchange/)',
        '[other host](https://example.com/ja-jp/exchange/)',
        '`https://learn.microsoft.com/en-us/exchange/`'
      ].join('\n')
    })
  );
  const result = validateFile(file, site.root);

  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0].message, /ロケール/);
});

test('prose checks ignore URLs, inline code, fenced code, HTML attributes, and source title', () => {
  const site = fixture();
  const file = site.write(
    'source/_posts/safe-exclusions.md',
    article({
      sourceTitle: 'Azure AD（original）：title',
      sourceUrl: 'https://example.com/Azure%20AD/%EF%BC%88source%EF%BC%89',
      body: [
        '`Azure AD（code）：value`',
        '`` `Azure AD（nested）` ``',
        '````text',
        '```',
        'Azure AD（still fenced）：value ﾃｽﾄ',
        '````',
        '```text',
        'Azure AD（fenced）：value ﾃｽﾄ',
        '```',
        '<span title="x > Azure AD（attribute）：value">正常</span>'
      ].join('\n')
    })
  );

  assert.deepEqual(validateFile(file, site.root).errors, []);
});

test('reports duplicate source URLs after safe trailing-slash normalization', () => {
  const site = fixture();
  site.write(
    'source/_posts/existing-article.md',
    article({
      sourceUrl: 'https://EXAMPLE.com/source/article',
      note: '※ この記事は、[Legacy article](https://EXAMPLE.com/source/article) の抄訳です。'
    })
  );
  const file = site.write('source/_posts/new-article.md', article());

  assert.match(messages(validateFile(file, site.root)).join('\n'), /既に存在/);
  assert.notEqual(
    normalizeSourceUrl('https://example.com/source/article?view=1'),
    normalizeSourceUrl('https://example.com/source/article?view=2')
  );
});

test('changedPostFiles includes additions, modifications, and renames but excludes deletions', () => {
  const site = fixture();
  const run = (...args) =>
    require('node:child_process').execFileSync('git', args, {
      cwd: site.root,
      stdio: 'ignore'
    });
  run('init');
  run('config', 'user.name', 'Test');
  run('config', 'user.email', 'test@example.com');
  site.write('source/_posts/modified.md', article());
  site.write('source/_posts/deleted.md', article());
  site.write('source/_posts/renamed-before.md', article());
  run('add', '.');
  run('commit', '-m', 'base');
  const base = require('node:child_process')
    .execFileSync('git', ['rev-parse', 'HEAD'], { cwd: site.root, encoding: 'utf8' })
    .trim();

  site.write('source/_posts/modified.md', article({ body: '変更後です。' }));
  fs.rmSync(path.join(site.root, 'source', '_posts', 'deleted.md'));
  fs.renameSync(
    path.join(site.root, 'source', '_posts', 'renamed-before.md'),
    path.join(site.root, 'source', '_posts', 'renamed-after.md')
  );
  site.write('source/_posts/path with spaces.md', article());
  run('add', '-A');
  run('commit', '-m', 'head');
  const head = require('node:child_process')
    .execFileSync('git', ['rev-parse', 'HEAD'], { cwd: site.root, encoding: 'utf8' })
    .trim();

  assert.deepEqual(changedPostFiles(base, head, site.root).sort(), [
    'source/_posts/modified.md',
    'source/_posts/path with spaces.md',
    'source/_posts/renamed-after.md'
  ]);
});
