'use strict';

exports.up = function(knex, Promise) {
    knex.schema.hasTable('users').then(function(exists) {
        if (!exists) {
            return knex.schema.createTable('users', function(t) {
                t.increments('id').primary();
                t.string('name', 100);
                t.string('passwd');
            });
        }else{
            return new Error("The table already exists");
        }
    });
};

exports.down = function(knex, Promise) {
    knex.schema.hasTable('users').then(function(exists) {
        if (exists) {
            return knex.schema.dropTable('users');
        }
    });
};
