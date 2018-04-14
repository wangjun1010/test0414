var ws = require("ws");
var webSocketServer = ws.Server;
var wss = new webSocketServer({port:9000});

var clientMap = new Object();
var i=0;
var str = "特工_";
wss.on("connection",(client)=>{
	//console.log(client);
	console.log(client+"上线了");
	i++;
	client.name = str+i;
	clientMap[client.name] = client;
	
	client.on("message",(msg)=>{
		console.log(msg);
		broadcast(msg,client);
	})
	
	client.on("close",()=>{
		console.log(client.name+"已经离开了")
	})
})

function broadcast(msg,client){
	for(var key in clientMap){
		clientMap[key].send(client.name+" say: "+msg+"\n");
	}
}

