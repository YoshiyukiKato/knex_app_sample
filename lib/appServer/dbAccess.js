//データベースに問い合わせをする小モジュール
//とりあえず繋いでみる。redis使ってキャッシュ化するのは後々

var pg = require("pg");
var dbPath = process.env.dburl;

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
    });
}

DbAccess.prototype.authUser = function(uid,passwd){
    if(!this.client) throw new Error();
    var query = "SELECT * FROM user WHERE uid = " + uid + " AND passwd = " + passwd + ";";
    this.client.query(query,function(err,result){
        
    });
}

DbAccess.prototype.close = function(dbPath){
    this.client.end();
}

function initDbAccess(dbPath){
    var dbAccess = new DbAccess(dbPath);
    return dbAccess;
}

exports.initDbAccess = initDbAccess;