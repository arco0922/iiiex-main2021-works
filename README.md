# 構成

- UIの実装：React.js + TypeScript ( https://reactjs.org/ )
  - 関数型コンポーネント + React-Hooks
- スタイリング：Styled-Components ( https://styled-components.com/ )
- バンドルツール：Webpack ( https://webpack.js.org/ )
- Linting：ESLint ( https://eslint.org/ )
- フォーマット： Prettier ( https://prettier.io/ )

# 環境のセットアップ

## 開発環境

### エディタ
VSCode (他のエディタが好みの人もいるかもしれませんが、今回はVSCodeで統一してください)
#### 拡張機能
- 必須のもの
  - ESLint
  - Prettier
- 入れると便利なもの
  - ES7 React/Redux/GraphQL/React-Native snippets
  - vscode-styled-components
  - Path Intellisense
  - GitLens
  - Git Graph
  - Bracket Pair Colorizer
  - Auto Rename Tag
  - Auto Close Tag 

## プロジェクトのセットアップ

node.js, npm は各自インストールしてください。

```sh
yarn -v 
```

でyarnが無い場合は、

```sh
npm install -g yarn
```

でyarnをインストールしてください。

本リポジトリをクローンしたら、

```sh
yarn install # 必要パッケージのインストール

yarn start # localhost:3000にアプリが立ち上がる
```

# 開発上の注意

## パッケージ回り
- 新しくパッケージをインストールする際は、必ず `yarn add` を用いること (`npm install` はダメ)

## 命名規則
- 命名は、基本的に CamelCase を用いること。snake_case は使わない
- コンポーネント名・型名は、大文字スタート、関数名・変数名は小文字スタート
- 自明な prefix, suffix は避ける (例えば、型名に ○○Type は不要)
- booleanの変数は is○○ にするなど、変数名や関数名をみて役割が分かるようにする
