var net = require("net");
var port = 9000;
var host = "localhost";

var client = new net.Socket();
client.setEncoding = "utf-8";

client.connect(port,host,()=>{
	client.write("hello");
})

client.on("data",(data)=>{
	console.log("服务端socket传来:"+data);
	say();
})

const readline = require("readline");
const r1 = readline.createInterface({
	input:process.stdin,
	output:process.stdout
})

function say(){
	r1.question("请输入:",(inputStr)=>{
		if(inputStr != 'bye'){
			client.write(inputStr+"\n");
		}else{
			client.destroy();
			r1.close();
		}
	})
}
