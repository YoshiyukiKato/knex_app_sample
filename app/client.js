var WebSocketClient = require('websocket').client;
var Promise = require("bluebird");

var client = new WebSocketClient();
var readline = require('readline');


//========LOGIN QUESTION FUNCTIONS========
function loginQuestion(connection) {
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
    //名前を聞く
    return new Promise(function(resolve,rejected){
        session.rl.question('Please input number about what you want to do.\n 1)Withdraw\n 2)Deposit\n 3)Pay\n 4)Quit :', function (opID) {
            if( Number(opID) === 1 ){
                //いくら引き出すのかを聞く
                session.operation = "withdraw";
                session.deposit = 0;                

            }else if( Number(opID) === 2 ){
                //いくら預けるのかを聞く
                session.operation = "deposit";
                session.withdraw = 0;

            }else if( Number(opID) === 3 ){
                session.operation = "pay";
                //誰に振り込むのかを聞く
                //いくら振り込むのかを聞く
            }
            resolve(session);
        });
    });
}

function askDirection(session){
    return new Promise(function(resolve,rejected){
        if(session.operation !== "pay"){
            resolve(session);
        }else{
            session.rl.question("Who will you pay for? :" + session.operation+ "? :",function(name){
                session.direction = name;
                resolve(session);
            });
        }
    });
}

function askAmount(session){
    return new Promise(function(resolve,rejected){
        session.rl.question("How much do you want to " + session.operation+ "? :",function(amount){
            if(!session.deposit){
                session.deposit = amount;
            }
            if(!session.withdraw){
                session.withdraw = amount;
            }
        });
    });
}



//========WEBSOCKET CLIENT EVENT SETTING========
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected:');

    loginQuestion().then(function(session){
        connection.sendUTF(JSON.stringify(session.user));
    });

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('app-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            var response = JSON.parse(message.utf8Data);
            if(response.state){
                connection.loginState = true;
            }
        }
    });
});

//app-protocolでサーバーに接続
client.connect('ws://localhost:8080/', 'app-protocol');