var Promise = require("bluebird");
var knex = require("knex")({
    client: 'pg',
    connection: {
        database: "travis_ci_test",
        user: "postgres"
    },
    migrations:{
        tableName:"knex_migrations"
    },
    pool: {
        min: 0,
        max: 7
    }
});


//===============BANK TEST==================
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

//=============== INTERFACE TEST==================
var interface = require("../app/lib/interface.js");
    
function testEmitter(string, pause){
    return new Promise(function(resolve, rejected){
        setTimeout(function(){
            process.stdin.emit('data', string + "\n");
            resolve();
        },pause)
    });
}

describe("Login sequence", function(){
    it("should return a configuration of login request.", function(done){
        interface.login().then(function(session){
            console.log(session.user);
            done();
        });
        
        //virtual user as test
        testEmitter("test_user",500)
        .then(function(){
            return testEmitter("test_passwd",500);
        });
    });
});

describe("Banking sequence", function(){
    it("should return a configuration of banking operation", function(done){
        interface.banking().then(function(session){
            console.log(session.banking);
            done();
        });
        
        //virtual operation as "deposit"
        testEmitter("2", 500)
        .then(function(){
            return testEmitter(100, 500);
        });
    });
});
