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

