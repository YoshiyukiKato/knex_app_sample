var gulp = require('gulp');
var knex = require("knex");

gulp.task('travis_migrate', function () {
    var travis_knex = {
        client: 'postgresql',
        connection: {
            database: "travis_ci_test",
            username: "postgres"
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
    }
    knex(travis_knex).migrate.latest();
    return;
});

gulp.task('travis_seed', function () {
    var travis_knex = {
        client: 'postgresql',
        connection: {
            database: "travis_ci_test",
            username: "postgres"
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
    }
    knex(travis_knex).seed.run();
    return;
});

gulp.task('migrate', function () {
    var travis_knex = {
        client: 'postgresql',
        connection: {
            host:'localhost',
            user: 'yoshiyuki',
            database :'yoshiyuki'
        },
        migrations: {
            directory: "./db/migrations",
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
        }
    }
    knex(travis_knex).migrate.latest()
    .then(function(){
        return knex(travis_knex).seed.run();
    });
});

gulp.task('seed', function () {
    var travis_knex = {
        client: 'postgresql',
        connection: {
            host:'localhost',
            user: 'yoshiyuki',
            database :'yoshiyuki'
        },
        migrations: {
            directory: "./db/migrations",
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
        }
    }
    
    knex(travis_knex).seed.run();
});

