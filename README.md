# pageful-front

## 目次
- [サービス概要](#サービス概要)
- [開発環境の導入](#開発環境の導入)
- [動作環境](#動作環境)
- [開発の流れ](#開発の流れ)

## サービス概要
デジタルコンテンツの配信・販売の支援サービス
 - フロントエンド https://pageful.app
 - バックエンド https://api.pageful.app

## 動作環境
開発環境に必要な環境
- node（npmを実行できるように）

開発ツールなど
- git
- Docker, docker-compose APIの開発環境の構築

インフラ
- Google Cloud Platform
  - GAE（フロントエンドのコードの実行）
  - GCS（静的ファイルのストレージ）
- さくらインターネット
  - VPS（APIサーバー・DB）

利用サービス
- Google Analytics
- [github](https://github.com/guruto/pageful-front)
- [SendGrid](https://app.sendgrid.com/) メール送信

バックエンドで使っている主なライブラリ等
- [Abraham/TwitterOAuth](https://twitteroauth.com/)
- [Google Cloud Client Library for PHP](https://googlecloudplatform.github.io/google-cloud-php/)

フロントで使っている主なライブラリ等
- axios
- [moment.js](https://momentjs.com/)

## 開発環境の導入
### レポジトリ
`git clone git@github.com:guruto/pageful-front.git`

### フロントエンドの実行（nuxt）
```
cd pageful-front
npm install
npm run dev
```
http://localhost:3000 でローカルのフロントエンドが実行されます。

### APIエンドポイント
`npm run dev` の場合、APIは開発環境の`https://devpai.pageful.app` へ接続されます。

APIをlocalhostで接続したい場合は `npm run start:local` でnuxtを実行してください。
その際のAPIエンドポイントは `http://localhost:80/` となります。

### ローカル環境のAPIエンドポイント
APIのレポジトリ
git clone git@github.com:guruto/pageful-server.git
実行方法はREADMEを見てください。

## 開発の流れ

ソースコードは github フローで管理する。

* master ブランチはいつでもデプロイ可能
* master ブランチからトピックブランチを作って開発する
* できたらプルリクエストを出す。レビューが終わったら master にマージされ、開発終了

### 動作テスト方法

* 変更箇所はPCとSPの両方で必ずテストする。
* 特に課金まわりの変更は影響が大きいので、慎重にテストを行う。

### サービスとしての動作確認環境

以下の環境で動くことを目標とする。必ずしも必ず全環境でテストする必要はないが、多くの箇所を変更した場合は、必ずテストすること。

* Mac: Firefox, Chrome, Safari 最新版
* Windows: IE, Edge, Firefox, Chrome 最新版
* iOS: Safari, Chrome
* Android: Chrome
