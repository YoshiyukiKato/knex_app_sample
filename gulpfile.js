var gulp = require('gulp');

var knex = require("knex");

gulp.task('travis', function () {
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
            tableName: 'knex_migrations'
        },
        seeds: {
            directory: './db/seeds/dev'
        }
    }
    knex(travis_knex).migrate.latest();
    knex(travis_knex).seed.run();
});


