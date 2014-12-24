'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.hasTable('users').then(function(exists) {
        return knex.schema.table('users', function (table) {
            table.integer('account').defaultTo(0);
        })
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.hasColumn('users','account').then(function(exists){
        if(exists){
            return knex.schema.table('users', function (table) {
                table.dropColumn('account');
            });
        }
    });
};
