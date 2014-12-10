var dbAccess = require("../lib/appServer/dbClient/dbAccess.js").initDbAccess(process.env.dburl);
var userUtil = require("../lib/appServer/dbClient/userUtil.js").initUserUtil(dbAccess, "specdb");

describe("User Auth Test",function(){
    it("should return user data ",function(done){
        userUtil.authUser("test1","passwd1", function(result,err){
            expect(result.length).toBe(1);
            console.log(result);
            done();
        });
    });
    
    it("should not return user data ",function(done){
        userUtil.authUser("test2","passwd3", function(result,err){
            expect(result.length).toBe(0);
            console.log(result);
            done();
        });
    });
});