# 都道府県人口データビューアー

このプロジェクトは、道府県別の人口推移を表示するReactアプリケーションです。

## 使用技術

- React 19.1.0
- TypeScript 4.9.5
- styled-components 6.1.17
- Recharts 2.15.3
- Storybook 8.6.12
- Webpack 5.99.7
- Jest (react-scriptsに含まれる)
- Testing Library
- ESLint (react-scriptsに含まれる)
- Prettier
- Husky (Git hooks)
- lint-staged

## 開発環境のセットアップ

1. リポジトリをクローン

```bash
git clone [リポジトリURL]
```

2. 依存パッケージのインストール

```bash
npm install
```

3. 環境変数の設定

プロジェクトのルートディレクトリに`.env`ファイルを作成し、以下の環境変数を設定します：

```bash
REACT_APP_API_KEY=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

4. 開発サーバーの起動

```bash
npm start
```

## 利用可能なスクリプト

### `npm start`

開発モードでアプリケーションを起動します。\
[http://localhost:3000](http://localhost:3000) でブラウザから確認できます。

### `npm test`

テストランナーを起動します。\
インタラクティブなウォッチモードでテストを実行します。

### `npm run build`

本番用のビルドを作成します。\
`build` フォルダに最適化されたビルドファイルが生成されます。

### `npm run storybook`

Storybookを起動します。\
[http://localhost:6006](http://localhost:6006) でコンポーネントのカタログを確認できます。

### `npm run format`

Prettierを使用してコードをフォーマットします。

## 開発規約

- コミット前に自動的にESLintとPrettierが実行されます
- コンポーネントはStorybookで管理します
- TypeScriptの型定義を適切に使用します
- styled-componentsを使用してスタイリングを行います

## デプロイ

ビルドされたファイルは `build` フォルダに生成されます。\
このフォルダの内容を静的ファイルホスティングサービスにデプロイすることで、アプリケーションを公開できます。

現在、アプリケーションは以下のURLで公開されています：
[https://population-viewer-by-prefecture.netlify.app/](https://population-viewer-by-prefecture.netlify.app/)
