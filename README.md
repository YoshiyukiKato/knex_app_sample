#About

Knex.jsを用いたサンプルアプリケーションです。  
本アプリケーションについての詳細な説明は、[Qiitaの記事]()をご覧ください。

#Structure

```
.
├── README.md
├── app
│   ├── client.js
│   └── server.js
├── db
│   ├── knexfile.js
│   ├── migrations
│   │   ├── 20141216110614_user.js
│   │   └── 20141221205038_add_account_to_user.js
│   └── seeds
│       └── dev
│           └── test_users.js
├── node_modules
│   ├── bluebird
│   ├── knex
│   ├── pg
│   └── websocket
├── package.json
└── spec
    └── querySpec.js
```

##Licence
MIT