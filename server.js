var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var db=require("./dbacess");
server.listen(process.env.PORT || 3000);
var mang=[];
io.sockets.on('connection',function(socket){
	console.log("CO nguoi connect");
	socket.on('new message',function(data){
		var message;
		if (mang.indexOf(data)<=-1){
			mang.push(data);
			console.log("DUNG KY THANH CONG="+data);
			message="DUNG KY THANH CONG="+data;
			socket.un=data;
			io.sockets.emit('server gui all',{noidung:mang});
		}
		else{
			console.log("DA DUOC SU DUNG ="+data);
			message="DA DUOC SU DUNG ="+data;
		}

		//
		 socket.emit('server gui',{noidung:message});
	});
	socket.on('createroom',function(ID){
		db.createroom(ID);
	});
});