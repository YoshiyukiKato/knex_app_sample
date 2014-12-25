"use strict"

var Promise = require("bluebird");
var mydb = require("../dbsetting.js").mydb;

var knex = require("knex")({
    client: 'pg',
    connection: {
        host: mydb.host,
        user: mydb.user,
        database: mydb.database
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
