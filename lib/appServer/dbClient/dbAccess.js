//データベースに問い合わせをする小モジュール
//とりあえず繋いでみる。redis使ってキャッシュ化するのは後々

var pg = require("pg");

function DbAccess(dbPath){
    //constructor
    this.dbPath=dbPath;
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

DbAccess.prototype.reconnect = function(){
    if(this.dbPath) this.connect(this.dbPath);
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

DbAccess.prototype.close = function(){
    this.client.end();
}

function initDbAccess(dbPath){
    var dbAccess = new DbAccess(dbPath);
    return dbAccess;
}

exports.initDbAccess = initDbAccess;