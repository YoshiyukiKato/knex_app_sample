var gulp = require('gulp');
var Knex = require("knex");
var jasmine = require('gulp-jasmine');
var Promise = require("bluebird");

gulp.task('travis_buildtest',function(){
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
    knex.migrate.latest()
    .then(function(){
        return new Promise(function(resolve,rejected){
            setTimeout(function genSeed(){
                knex.schema.hasTable("users").then(function(exist){
                    if(!exist){
                        setTimeout(genSeed,1000);
                    }else{
                        resolve(knex);
                    }
                });
            },1000);
        });
    })
    .then(function(knex){
        return knex.seed.run();
    })
    .then(function(){
        return new Promise(function(resolve,rejected){
            setTimeout(function test(){
                knex.schema.hasColumn("users","account").then(function(exist){
                    if(!exist){
                        setTimeout(test,500);
                    }else{
                        gulp.src('spec/travisSpec.js').pipe(jasmine());
                        resolve("Ready to Test!!");
                    }
                });
            },500);
        });
    })
    .then(function(message){
        console.log(message);
        return;
    });
});

gulp.task('buildtest',function(){
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
        
    return knex.migrate.latest()
    .then(function(){
        return new Promise(function(resolve,rejected){
            setTimeout(function genSeed(){
                knex.schema.hasTable("users").then(function(exist){
                    if(!exist){
                        setTimeout(genSeed,100);
                    }else{
                        resolve(knex);
                    }
                });
            },100);
        });
    })
    .then(function(knex){
        return knex.seed.run();
    })
    .then(function(){
        return new Promise(function(resolve,rejected){
            setTimeout(function test(){
                knex.schema.hasColumn("users","account").then(function(exist){
                    if(!exist){
                        setTimeout(test,100);
                    }else{
                        gulp.src('spec/localSpec.js').pipe(jasmine());
                        resolve("Ready to Test!!");
                    }
                });
            },100);
        });
    })
    .then(function(message){
        console.log(message);
        return;
    });
});

