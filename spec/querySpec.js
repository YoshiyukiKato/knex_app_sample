"use strict"

var Promise = require("bluebird");
var knex = require("knex")({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'yoshiyuki',
        database: 'yoshiyuki'
    },
    migrations:{
        tableName:"knex_migrations"
    },
    pool: {
        min: 0,
        max: 7
    }
})

describe("Select all from 'users'",function(){
	it("should return all rows of user", function(done){
		knex.select("*").from("users").then(function(rows){
			console.log(rows);
			done();
		});
    });
});
