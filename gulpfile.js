var gulp = require('gulp');
var exit = require("gulp-exit");
var jasmine = require('gulp-jasmine');
var Knex = require("knex");
var Promise = require("bluebird");

var travisdb = require("./knexfile.js").staging;
var localdb = require("./knexfile.js").development;

gulp.task('travis_build',function(){
    var knex = Knex(travisdb);
    
    return knex.migrate.latest()
    .then(function(){
        return new Promise(function(resolve,rejected){
            setTimeout(function readySeed(){
                knex.schema.hasTable("users").then(function(exist){
                    if(!exist) setTimeout(readySeed,1000);
                    else resolve(knex);
                });
            },1000);
        });
    })
    .then(function(knex){
        return knex.seed.run();
    })
    .then(function(){
        return new Promise(function(resolve,rejected){
            setTimeout(function readyTest(){
                knex.schema.hasColumn("users","account").then(function(exist){
                    if(!exist) setTimeout(readyTest,500);
                    else resolve("Ready to Test!!");
                });
            },500);
        });
    })
    .then(function(message){
        console.log(message);
        return gulp.src('spec/travisSpec.js').pipe(jasmine()).pipe(exit());
    });
});

gulp.task('local_build',function(){
    var knex = Knex(localdb);
        
    return knex.migrate.latest()
    .then(function(){
        return new Promise(function(resolve,rejected){
            setTimeout(function genSeed(){
                knex.schema.hasTable("users").then(function(exist){
                    if(!exist) setTimeout(genSeed,100);
                    else resolve(knex);
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
                    if(!exist) setTimeout(test,100);
                    else resolve("Ready to Test!!");
                });
            },100);
        });
    })
    .then(function(message){
        console.log(message);
        return gulp.src('spec/localSpec.js').pipe(jasmine()).pipe(exit());;
    });
});

