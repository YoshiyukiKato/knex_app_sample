//start with
//$ jasmine-node dbConnectSpec.js --config dburl YOUR_DB_URL_HERE

//++precondition++
//this require a table "specdb" for running test:
////CREATE TABLE specdb(uid varchar(10), passwd varchar(10));
////INSERT INTO specdb VALUES('test1', 'passwd1');
////INSERT INTO specdb VALUES('test2', 'passwd2');
////INSERT INTO specdb VALUES('test3', 'passwd3');

var dbCli = require("../lib/appServer/dbClient/dbAccess.js").initDbAccess(process.env.dburl);

describe("SQL Query Test",function(){
    it("should return array of object data",function(done){
        dbCli.query("SELECT * FROM specdb;", function(result,err){
            expect(err).toBe(undefined);
            console.log(result);
            dbCli.close();
            done();
        });
    });
});
