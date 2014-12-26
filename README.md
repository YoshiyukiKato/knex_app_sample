#About
[ ![travis](https://travis-ci.org/YoshiyukiKato/knex_app_sample.svg?branch=master) ](https://travis-ci.org/YoshiyukiKato/knex_app_sample)

Knex.jsを用いたサンプルアプリケーションです。  
本アプリケーションについての詳細な説明は、[Qiitaの記事](http://qiita.com/YoshiyukiKato/items/59c9ac742536d706b322)をご覧ください。

#Precondition

* Node.js
* PostgreSQL

#Usage
##Install

```sh
$ git clone git@github.com:YoshiyukiKato/knex_app_sample.git
$ cd knex_app_sample
$ npm install
```
##Build

`knexfile.js`の`development`を、自分のデータベース用に書き換えて利用してください。なお、`staging`はTravis CI用の記述になっております。

```js
// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host: "hostname",
            user: "username",
            database :"database",
            password :"password"
        },
        migrations: {
            directory:"./db/migrations",
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
        },
        pool:{
            min:0,
            max:7
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: "travis_ci_test",
            user: "postgres"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: "./db/migrations",
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user:     'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }

};

```

```sh
$ gulp local_build
```

##Run

```sh
$ node app/server.js
```

```sh
$ node app/client.js
```

```
WebSocket Client Connected:
What is your name?:taro
Password:taropasswd
Login succeeded
Please input number about what you want to do.
 1)Withdraw
 2)Deposit
 3)Pay
 4)Quit
 :2
How much do you want to deposit? :1000
success: deposit $1000
````

##Licence
MIT