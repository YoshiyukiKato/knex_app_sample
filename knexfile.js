// Update with your config settings.
var mydb = require("./dbsetting.js").mydb;

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host: mydb.host,
            user: mydb.user,
            database :mydb.database
        },
        migrations: {
            directory:"./db/migrations",
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
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
            directory:"./db/migrations",
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
