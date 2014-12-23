var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

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
    return knex.migrate.latest(travis_knex);
});

gulp.task('travis_seed', function () {
    return knex.seed.run(travis_knex);
});

gulp.task('test', function () {
    return gulp.src('spec/*Spec.js').pipe(jasmine());
});