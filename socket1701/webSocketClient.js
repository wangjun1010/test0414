var ws = new WebSocket("ws://localhost:9000");

ws.onopen = function(){
	ws.send("大家好");
}

ws.onmessage = function(){
	console.log(event);
	var chatroom = document.querySelectorAll("#chatroom")[0];
	chatroom.innerHTML +="<br/>"+event.data;
}

ws.onerror = function(error){
	alert(error);
}

ws.onclose = function(){
	alert("closed!!!!");
}
