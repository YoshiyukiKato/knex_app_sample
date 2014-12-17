'use strict';

exports.seed = function(knex, Promise) {
    var testUsers = [{name: 'taro',passwd:'taropasswd'},{name: 'jiro',passwd:'jiropasswd'},{name: 'saburo',passwd:'saburopasswd'}]
    
    return knex('users').insert(testUsers);
};