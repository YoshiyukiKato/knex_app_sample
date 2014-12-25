var WebSocketServer = require('websocket').server;
var http = require('http');

var mydb = require("../dbsetting.js").mydb;
var knex = require("knex")({
    client: 'pg',
    connection:{
        //ここを自分のデータベース用に書き換える
        user     : mydb.user,
        database : mydb.database,
        host: mydb.host
    },
    migrations: {
        tableName: 'knex_migrations'
    },
    pool:{
        min:0,
        max:7
    }
});
var bank = require("./lib/bank.js");

//========USER AUTHORIZE FUNCTION========
function authUser(config){
    var name = config.name,
        passwd = config.passwd;
    return knex.select("*").from("users").where({name:name, passwd:passwd});
}

//========BANKING=========
function banking(config){
    return bank.operation(knex, config)
}


//==========WEB SOCKET SERVER============
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin){
    //本当はここでリクエストオリジンを捌く
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    //app-protocolによる、当該オリジンからのアクセスを許可
    var connection = request.accept('app-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');

    connection.on('message', function(message) {
        //バイナリは送らないので割愛
        //メッセージは全てutf8で送られてくるとする
        if (message.type === 'utf8') {
            var input = JSON.parse(message.utf8Data);
            if(input.type === "login"){
                authUser(input.config)
                .then(function(rows){
                    if(rows[0]){
                        connection.uid = rows[0].id;
                        connection.sendUTF(JSON.stringify({message:"Login succeeded", state:true}));
                    }else{
                        connection.sendUTF(JSON.stringify({message:"Login failed", state:false}));
                    }
                })
                .catch(function(err){
                    console.log(err);
                });
            }
            if(input.type === "banking"){
                input.config.operator = connection.uid;
                input.config.direction = input.config.direction || connection.uid;
                        
                banking(input.config)
                .then(function(message){
                    connection.sendUTF(JSON.stringify({message:message, state:true}));
                })
                .catch(function(err){
                    console.log(err);
                    connection.sendUTF(JSON.stringify({message:"Banking failed", state:true}));
                });
            }
        }
    });

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});