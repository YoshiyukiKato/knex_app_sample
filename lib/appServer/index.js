function AppServer(){
    
}

AppServer.prototype.loginAuth = function(userid,password){
    //plan to use bcrypto
    
}

function initServer(){
    var appServer = new AppServer();
    return appServer;
}

exports.initServer = initServer;