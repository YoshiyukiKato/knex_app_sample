function UserUtil(dbAccess, userdb){
    this.dbAccess = dbAccess; //instance of dbAccess
    this.userdb = userdb; //table name of userdb
}

UserUtil.prototype.authUser = function(uid,passwd,callback){
    if(!this.dbAccess) throw new Error();
    var sqlQuery = "SELECT * FROM " + this.userdb + " WHERE uid = '" + uid + "' AND passwd = '" + passwd + "';";
    this.dbAccess.query(sqlQuery, callback);
}

UserUtil.prototype.updateUser = function(){
    //user dbのアップデート    
}

function initUserUtil(dbCli, userdb){
    if(!dbCli || !userdb) throw new Error();
    var userUtil = new UserUtil(dbCli, userdb);
    return userUtil;
}

exports.initUserUtil = initUserUtil;