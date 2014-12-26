"use strict"

var Promise = require("bluebird");

var localdb = require("../knexfile.js").development;
var knex = require("knex")(localdb);

var bank = require("../app/lib/bank.js");

var config = {
    operation:"deposit",
	operator:1,
	direction:1,
	withdraw:0,
	deposit:100
}

describe("Bank operation",function(){
    it("should be return updated account data",function(done){
        bank.operation(knex,config)
        .then(function(message){
            console.log(message);
            done();
        });
    });
});

