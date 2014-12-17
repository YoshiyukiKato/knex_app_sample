//This module ride on the connection of "dbAccess" and recieve table name of userdb.
//

function UserUtil(dbAccess, userdb){
    this.dbAccess = dbAccess; //instance of dbAccess
    this.userdb = userdb; //table name of userdb
}

UserUtil.prototype.authUser = function(uid,passwd,callback){
    if(!this.dbAccess) throw new Error("No DB Access Error");
    var sqlQuery = "SELECT * FROM " + this.userdb + " WHERE uid = '" + uid + "' AND passwd = '" + passwd + "';";
    this.dbAccess.query(sqlQuery, callback);
}

UserUtil.prototype.createUser = function(uid,passwd,callback){
    //initialize by uid and passwd
    var sqlQuery = "INSERT INTO " + this.userdb + " VALUES('" + uid +"','" + passwd + "');"
    callback(sqlQuery);
}

UserUtil.prototype.updateUser = function(uid,updates,callback){
    //user dbのアップデート
    //updates = {key1:value1,key2:value2}
    if(!this.dbAccess) throw new Error("No DB Access Error");
    var keys = Object.keys(updates);
    var sqlQuery = "UPDATE " + this.userdb + " SET";
    
    keys.forEach(function(key,index){
        if(index > 0) sqlQuery += ","
        sqlQuery += " " + key + " = '" + updates[key] + "'";
    });
    sqlQuery += " WHERE uid = " + uid + ";";
    callback(sqlQuery);
}

UserUtil.prototype.genUpdateQuery = function(uid,updates){
    if(!this.dbAccess) throw new Error("No DB Access Error");
    
    var keys = Object.keys(updates);
    var sqlQuery = "UPDATE " + this.userdb + " SET";
    
    keys.forEach(function(key,index){
        if(index > 0) sqlQuery += ","
        sqlQuery += " " + key + " = '" + updates[key] + "'";
    });
    
    sqlQuery += " WHERE uid = '" + uid + "';";
    return sqlQuery;
}

function initUserUtil(dbCli, userdb){
    if(!dbCli || !userdb) throw new Error();
    var userUtil = new UserUtil(dbCli, userdb);
    return userUtil;
}

exports.initUserUtil = initUserUtil;