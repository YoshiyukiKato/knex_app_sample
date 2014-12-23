var WebSocketClient = require('websocket').client;
var Promise = require("bluebird");

var client = new WebSocketClient();
var interface = require("./lib/inteface.js");


//========WEBSOCKET CLIENT EVENT SETTING========
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected:');
    
    interface.login().then(function(session){
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