//データベースに問い合わせをする小モジュール
//とりあえず繋いでみる。redis使ってキャッシュ化するのは後々

//var pg = require("pg");

var knex = require('knex');

function initDbAccess(dbPath){
    var dbAccess = knex({
        client:"pg",
        connection:dbPath
    });
    return dbAccess;
}

exports.initDbAccess = initDbAccess;