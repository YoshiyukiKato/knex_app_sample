'use strict';

exports.up = function(knex, Promise) {
    knex.schema.hasTable('users').then(function(exists) {
        return knex.schema.table('users', function (table) {
            table.integer('account').defaultTo(0);
        })
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', function (table) {
        table.dropColumn('account');
    });
};
