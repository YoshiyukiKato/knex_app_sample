var WebSocketServer = require('websocket').server;
var http = require('http');
var knex = require("knex")({
	client: 'pg',
	connection:{
		user     : 'yoshiyuki',
 		database : 'yoshiyuki'
	},
	migrations: {
		tableName: 'knex_migrations'
	},
    pool:{
        min:0,
        max:7
    }
});

//========USER AUTHORIZE FUNCTION========
function authUser(name, passwd){
	return knex.select("name","passwd").from("users").where({name:name, passwd:passwd});
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
            authUser(input.name, input.passwd)
            .then(function(rows){
                if(rows[0]){
                    connection.uid = rows[0].id;
                    connection.sendUTF("Login succeeded");
                }else{
                    connection.sendUTF("Login failed");
                }
            })
            .catch(function(err){
                console.log(err);
            });
		}
	});

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});