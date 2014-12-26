"use strict"

var Promise = require("bluebird");
var localdb = require("../knexfile.js").development;

var knex = require("knex")(localdb);

describe("Select all from 'users'",function(){
	it("should return all rows of user", function(done){
		knex.select("*").from("users").then(function(rows){
			console.log(rows);
			done();
		});
    });
});
