var gulp = require('gulp');
var Knex = require("knex");
var jasmine = require('gulp-jasmine');

gulp.task('travis_migrate', function () {
    var travis_knex = {
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
    }
    Knex(travis_knex).migrate.latest();
    return;
});

gulp.task('travis_seed', function (){
    var knex = Knex({
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
    });
    setTimeout(function genSeed(){
        knex.schema.hasTable("users").then(function(exist){
            if(!exist){
                setTimeout(genSeed,500);
            }else{
                knex.seed.run();
                return;     
            }
        });
    },500);
});

gulp.task('travis_test',function(){
    var knex = Knex({
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
    });
    setTimeout(function travisTest(){
        knex.schema.hasTable("users").then(function(exist){
            if(!exist){
                setTimeout(travisTest,500);
            }else{
                return knex.schema.hasColumn("users","account");
            }
        }).then(function(exist){
            if(!exist){
                setTimeout(travisTest,500);
            }else{
                return gulp.src('spec/travisTest.js').pipe(jasmine());
            }
        });
    },500);
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
    Knex(travis_knex).migrate.latest();
});

gulp.task('seed', function () {
    var knex = Knex({
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
    });
    setTimeout(function genSeed(){
        knex.schema.hasTable("users").then(function(exist){
            if(!exist){
                setTimeout(genSeed,500);
            }else{
                knex.seed.run();
            }
        });
    },500);
});

gulp.task('test',function(){
    var knex = Knex({
        client: 'postgresql',
        connection: {
            host:'localhost',
            user: 'yoshiyuki',
            database :'yoshiyuki'
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
    });
    setTimeout(function test(){
        knex.schema.hasTable("users").then(function(exist){
            if(!exist){
                setTimeout(test,500);
            }else{
                return knex.schema.hasColumn("users","account");
            }
        }).then(function(exist){
            if(!exist){
                setTimeout(test,500);
            }else{
                gulp.src('spec/interfaceSpec.js').pipe(jasmine());
                gulp.src('spec/bankSpec.js').pipe(jasmine());
            }
        });
    },500);
});

