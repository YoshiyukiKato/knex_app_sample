var gulp = require('gulp');

var knex = require("knex");
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

gulp.task('travis_migrate', function () {
    return knex(travis_knex).migrate.latest(travis_knex);
});

gulp.task('travis_seed', function () {
    return knex(travis_knex).seed.run(travis_knex);
});
