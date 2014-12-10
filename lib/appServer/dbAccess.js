//データベースに問い合わせをする小モジュール
//とりあえず繋いでみる。redis使ってキャッシュ化するのは後々

var pg = require("pg");

function DbAccess(dbPath){
    //constructor
    this.connect(dbPath);
}

DbAccess.prototype.connect = function(dbPath){
    this.client = new pg.Client(dbPath);
    this.client.connect(function(err){
        if(err) {
            return console.error('could not connect to postgres', err);
        }
        else{
            return;
        }
    });
}

DbAccess.prototype.query = function(sqlQuery,callback){
    if(!this.client) throw new Error();
    
    var dbQuery = this.client.query(sqlQuery);
    var rows = [];
    
    dbQuery.on("row",function(row){
        rows.push(row);
    });
    dbQuery.on("end",function(row,err){
        callback(rows, err);
    });
    dbQuery.on("error",function(err){
        throw err;
    });
}

DbAccess.prototype.authUser = function(uid,passwd){
    if(!this.client) throw new Error();
    var sqlQuery = "SELECT * FROM user WHERE uid = " + uid + " AND passwd = " + passwd + ";";
    var dbQuery = this.client.query(sqlQuery);
    dbQuery.on("row",function(row){});
    dbQuery.on("end",function(row,err){});
    dbQuery.on("error",function(err){});
}

DbAccess.prototype.close = function(dbPath){
    this.client.end();
}

function initDbAccess(dbPath){
    var dbAccess = new DbAccess(dbPath);
    return dbAccess;
}

exports.initDbAccess = initDbAccess;