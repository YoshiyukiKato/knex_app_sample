#About
![travis](https://travis-ci.org/YoshiyukiKato/knex_app_sample.svg?branch=master)

Knex.jsを用いたサンプルアプリケーションです。  
本アプリケーションについての詳細な説明は、[Qiitaの記事]()をご覧ください。

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