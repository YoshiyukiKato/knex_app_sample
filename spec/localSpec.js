var Promise = require("bluebird");
var Knex = require("knex");
var interface = require("../app/lib/interface.js");
var bank = require("../app/lib/bank.js");
var mydb = require("../dbsetting.js").mydb;
//=============== INTERFACE TEST==================

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
        testEmitter("test_user",100)
        .then(function(){
            return testEmitter("test_passwd",100);
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
        testEmitter("2", 100)
        .then(function(){
            return testEmitter(100, 100);
        });
    });
});

//===============BANK TEST==================

describe("Bank operation",function(){
    it("should be return updated account data",function(done){
        var knex = Knex({
            client: 'pg',
            connection: {
                //ここを自分のデータベース用に書き換える
                database: mydb.database,
                user: mydb.user,
                host: mydb.host
            },
            migrations:{
                directory:"./db/migrations",
                tableName:"knex_migrations"
            },
            pool: {
                min: 0,
                max: 7
            }
        });
        
        var config = {
            operation:"deposit",
            operator:1,
            direction:1,
            withdraw:0,
            deposit:100
        }
        bank.operation(knex,config)
        .then(function(message){
            console.log(message);
            done();
        });
    });
});
