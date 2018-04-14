var net = require("net");
var chatServer = net.createServer(),
    clientMap = new Object();
    
var i= 0;
var str = "特工_";

chatServer.on("connection",(client)=>{
	console.log(client);
	console.log("客户端有人连接~~~~~");
	i++;
	client.name = str+i;
	clientMap[client.name] = client; 
	
	client.on("data",(data)=>{
		console.log("客户端传来:"+data);
		broadcast(data,client);
	})
	
	client.on("error",(error)=>{
		console.log(error);
		client.end();
	});
	
	client.on("close",(data)=>{
		delete clientMap[client.name];
		console.log(client.name+"下线了");
		broadcast(client.name+"下线了",client);
	})
})

function broadcast(msg,client){
	for(var key in clientMap){
		clientMap[key].write(client.name+" say: "+msg+"\n");
	}
}

chatServer.listen(9000);
