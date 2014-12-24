// Update with your config settings.

module.exports = {

    development: {
        client: 'postgresql',
        connection: {
            host:'localhost',
            user: 'yoshiyuki',
            database :'yoshiyuki'
        },
        migrations: {
            directory:"./migrations",
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds/dev'
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
            directory:"./migrations",
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds/dev'
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
