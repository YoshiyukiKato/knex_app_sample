//start with
//$ jasmine-node dbConnectSpec.js --config dburl YOUR_DB_URL_HERE

//++precondition++
//this require a table "specdb" for running test:
////CREATE TABLE specdb(id int, name varchar(10));
////INSERT INTO specdb(1,test1);
////INSERT INTO specdb(2,test2);
////INSERT INTO specdb(3,test3);

var dbCli = require("../lib/appServer/dbAccess.js").initDbAccess(process.env.dburl);

describe("SQL Query Test",function(){
    it("should return array of object data",function(done){
        dbCli.query("SELECT * FROM specdb", function(result,err){
            expect(err).toBe(undefined);
            console.log(result);
            done();
        });
    });
});

