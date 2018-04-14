var express = require("express");
var app = express();
var server = require("http").Server(app);

var io = require("socket.io")(server);
var port = 8000;
var host = "localhost";
var fs = require("fs");

app.use("/",express.static(__dirname+"/"));

app.get("/",(req,res)=>{
	fs.readFile("./socketIo.html","utf-8",(error,data)=>{
		if(error) throw error;
		callback(data);
	})
	function callback(data){
		res.send(data);
	}
})

var clientMap = {};
var i=0;
var str = "特工_";
io.on("connection",(client)=>{
	console.log("有人上线了");
	i++;
	client.name = str+i;
	clientMap[client.name] = client;
})
io.on("message",(msg)=>{
	broadcast(msg,client);
})
io.on("disconnect",()=>{
	console.log("有人下线了");
	delete clientMap[client.name];
})

function broadcast(msg,client){
	for(var key in clientMap){
		clientMap[key].send(client.name+" say: "+msg+"\n");
	}
}

server.listen(port,host,()=>{
	console.log(`server is running at http://${host}:${port}`);
})
