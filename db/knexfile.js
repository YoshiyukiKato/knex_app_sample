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
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './seeds/dev'
        }
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'yoshiyuki',
            user:     'yoshiyuki'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
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