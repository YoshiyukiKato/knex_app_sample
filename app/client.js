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
            console.log("Received: '" + message.utf8Data + "'");
            if
        }
    });
});

//app-protocolでサーバーに接続
client.connect('ws://localhost:8080/', 'app-protocol');