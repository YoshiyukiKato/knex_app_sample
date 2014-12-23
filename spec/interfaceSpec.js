var Promise = require("bluebird");
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