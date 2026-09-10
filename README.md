# jpmessage blog site

Go to the [blog site](https://jpmessaging.github.io/blog/).

## 抄訳記事の検証

PR で追加または更新された `source/_posts/*.md` のうち、規定の抄訳注釈を持つ記事は GitHub Actions で検証されます。ローカルでは、base と head のコミットを指定して実行できます。

```shell
npm ci
npm run test:translation-validation
npm run validate:translations -- --base <base-commit> --head <head-commit>
```

検証はファイルを変更せず、削除された記事、既存記事全体、通常の日本語記事は対象にしません。