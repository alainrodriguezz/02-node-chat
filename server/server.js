const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'./../public')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(publicPath))




io.on('connection',(socket)=>{
	console.log('new SocketIO connection')

	//Welcome user (to me)
	socket.emit('newMessage',{
		from:'Admin',
		text:'Welcome to the Chat',
		createdAt:new Date().getTime()
	})

	//Welcome user (to everyone)
	socket.broadcast.emit('newMessage',{
		from:'Admin',
		text:'A new user has joined',
		createdAt:new Date().getTime()
	})

	//Send message in Chat
	socket.on('createMessage',(message)=>{
		console.log('createMessage',message)
		io.emit('newMessage',{
			from:message.from,
			text:message.text,
			createdAt:new Date().getTime()
		})
	})






	socket.on('disconnect',()=>console.log('SocketIO disconnected'))
})




server.listen(port,()=>console.log(`connected on ${port}`))





// const path = require('path');
// const socketIO = require('socket.io');
// const express = require('express');
// const http = require('http');


// const port = process.env.PORT || 3000;
// const publicPath = path.join(__dirname,'./../public');


// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);


// app.use(express.static(publicPath));


// io.on('connection',(socket)=>{
// 	console.log('New user connected')

// 	socket.emit('newEmail',{
// 		from:'friend@gmail.com',
// 		text:'Hey, whats up',
// 		createdAt:123
// 	})

// 	socket.on('createEmail',(newEmail)=>{
// 		console.log('createEmail',newEmail)
// 	})

// 	socket.on('disconnect',()=>{
// 		console.log('User disconnected')	
// 	})
// })



// server.listen(port,()=>{
// 	console.log(`Listening on ${port}`);
// })