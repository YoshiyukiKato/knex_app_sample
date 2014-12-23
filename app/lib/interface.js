var Promise = require("bluebird");
var readline = require('readline');

//========LOGIN QUESTION FUNCTIONS========
function loginQuestion() {
    //名前とパスワードを聞く
    var session = {};
    session.rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return askName(session).then(askPasswd)
}

function askName(session){
    //名前を聞く
    return new Promise(function(resolve,rejected){
        session.rl.question('What is your name?:', function (name) {
            session.user = {};
            session.user.name = name;
            resolve(session);
        });
    });
}

function askPasswd(session){
    //パスワードを聞く
    return new Promise(function(resolve,rejected){
        session.rl.question('Password:', function (passwd) {
            session.user.passwd = passwd;
            resolve(session);
            session.rl.close();
        });
    });
}


//========BANK OPERATION INTERFACE FUNCTIONS=========
function bankingQuestion(connection) {
    //何をしたいか聞く
    var session = {};
    session.rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return askOperation(session).then(askDirection).then(askAmount);
}

function askOperation(session){
    //何がしたいのか聞く
    return new Promise(function(resolve,rejected){
        session.rl.question('Please input number about what you want to do.\n 1)Withdraw\n 2)Deposit\n 3)Pay\n 4)Quit :', function (opID) {
            session.banking = {};
            if( Number(opID) === 1 ){
                session.banking.operation = "withdraw";              
            }else if( Number(opID) === 2 ){
                session.banking.operation = "deposit";
            }else if( Number(opID) === 3 ){
                session.banking.operation = "pay";
            }else{
                console.log("See You!");
                session.rl.close();
            }
            resolve(session);
        });
    });
}

function askDirection(session){
    return new Promise(function(resolve,rejected){
        if(session.banking.operation !== "pay"){
            resolve(session);
        }else{
            session.rl.question("Who will you pay for? :",function(name){
                session.banking.direction = name;
                resolve(session);
            });
        }
    });
}

function askAmount(session){
    return new Promise(function(resolve,rejected){
        session.rl.question("How much do you want to " + session.banking.operation+ "? :",function(amount){
            session.rl.close();
            if(session.banking.operation === "withdraw"){
                session.banking.deposit = 0;
                session.banking.withdraw = amount;
            }else if(session.banking.operation === "deposit"){
                session.banking.deposit = amount;
                session.banking.withdraw = 0;
            }else{
                session.banking.deposit = session.banking.withdraw = amount;
            }
            resolve(session);
        });
    });
}

exports.login = loginQuestion;
exports.banking = bankingQuestion;