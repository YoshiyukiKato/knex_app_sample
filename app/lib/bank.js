var Promise = require("bluebird");

function operation(knex, config){
    return knex.transaction(function(trx) {
        var session = {
            trx:trx,
            config:config
        };

        return withdraw(session)
        .then(deposit)
        .then(function(session){
            return new Promise(function(resolve,rejected){
                resolve(successMessage(config));
            });
        });
    });
}

function withdraw(session){
    var trx = session.trx;
    var config = session.config;

    return new Promise(function(resolve, rejected){
        if(config.withdraw > 0){
            //引き出し金額が0じゃないなら実行
            trx.select("*").from("users").where({id:config.operator})
            .then(function(rows){
                //引き出し。口座がないときはエラー
                if(!rows[0]) throw new Error("Abort::No such account.");

                var sum = rows[0].account - Number(config.withdraw);
                if(sum > 0) return trx.update("account",sum).from("users").where({id:config.operator});
                else rejected(new Error("Abort::Not enough money!"));       		
            })
            .then(function(){
                resolve(session);
            });
        }else{
            //引き出し金額が0なら次へ
            resolve(session);
        }
    });
}

function deposit(session){
    var trx = session.trx;
    var config = session.config;

    return new Promise(function(resolve,rejected){
        if(config.deposit > 0){
            //振り込み金額が0じゃないなら実行
            trx.select("*").from("users").where({id:config.direction})
            .then(function(rows){
                //振り込み。口座がないときはエラー
                if(!rows[0]) rejected(new Error("Abort::No such account."));        

                var sum = rows[0].account + Number(config.deposit);
                return trx.update("account",sum).from("users").where({id:config.direction});
            })
            .then(function(){
                resolve(session);
            });
        }else{
            //振り込み金額が0なら次へ
            resolve(session);
        }  
    });  
}

function successMessage(config){
    var message = "success: "
    if(config.operation === "withdraw"){
        message += config.operation + " $" + config.withdraw;
    }else{
        message += config.operation + " $" + config.deposit;
    }
    return message
}

/*===========OLD VERSION OPERATION FUNCTION===========
function operation(){
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
}
*/

exports.operation = operation;
