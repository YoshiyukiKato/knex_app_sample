var WebSocketClient = require('websocket').client;
var Promise = require("bluebird");

var client = new WebSocketClient();
var interface = require("./lib/interface.js");

//========WEBSOCKET CLIENT EVENT SETTING========
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected:');
    
    interface.login().then(function(session){
        var data = {};
        data.config = session.user;
        data.type = "login";
        connection.sendUTF(JSON.stringify(data));
        return;
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
                console.log(response.message);
                interface.banking().then(function(session){
                    var data = {};
                    data.config = session.banking;
                    data.type = "banking";
                    connection.sendUTF(JSON.stringify(data));
                    return;
                })
                .catch(function(err){
                    console.log(err);
                    connection.close();
                });
            }
        }
    });   
});

function sequential(cb){
    console.log(work);
    return interface.banking().then(function(session){
        cb(session);
    })
    .then(function(){
        return sequential(cb);
    });
}

//app-protocolでサーバーに接続
client.connect('ws://localhost:8080/', 'app-protocol');