var Promise = require("bluebird");

function withdraw(session){
    var trx = session.trx;
    var config = session.config;
    
    if(config.withdraw > 0){
        //引き出し金額が0じゃないなら実行
        return trx.select("*").from("users").where({id:config.operator})
        .then(function(rows){
            //引き出し。口座がないときはエラー
            if(!rows[0]) throw new Error("Abort::No such account.");

            var sum = rows[0].account - config.withdraw;
            if(sum > 0) return trx.update("account",sum).from("users").where({id:config.operator});
            else throw new Error("Abort::Not enough money!");       		
        })
    }else{
        //引き出し金額が0なら次へ
        return;
    }
    

}

function deposit(session){
    var trx = session.trx;
    var config = session.config;
    
    if(config.deposit > 0){
        //振り込み金額が0じゃないなら実行
        return trx.select("*").from("users").where({id:config.direction})
        .then(function(rows){
            //振り込み。口座がないときはエラー
            if(!rows[0]) throw new Error("Abort::No such account.");        

            var sum = rows[0].account + config.deposit;
            return trx.update("account",sum).from("users").where({id:config.direction});
        })
    }else{
        //振り込み金額が0なら次へ
        return;
    }
    
}

function operation(knex, config){
    return knex.transaction(function(trx) {
        //引き出し元を探してくる
        var session = {
            trx:trx,
            config:config
        };
        
        return withdraw(session)
        .then(function(){
            return deposit(session);
        }).then(function(){
            console.log("success");
        });
        
        /*
        return trx.select("*").from("users").where({id:config.operator})
        .then(function(rows){
            //引き出し。口座がないときはエラー
            if(!rows[0]) throw new Error("Abort::No such account.");

            var sum = rows[0].account - config.withdraw;
            if(sum > 0) return trx.update("account",sum).from("users").where({id:rows[0].id});
            else throw new Error("Abort::Not enough money!");       		
        })
        .then(function(rows){
            //振り込み先を探してくる
            return trx.select("*").from("users").where({id:config.direction})
        })
        .then(function(rows){
            //振り込み。口座がないときはエラー
            if(!rows[0]) throw new Error("Abort::No such account.");        

            var sum = rows[0].account + config.deposit;
            return trx.update("account",sum).from("users").where({id:rows[0].id});
        });
        */
    });
}

exports.operation = operation;
