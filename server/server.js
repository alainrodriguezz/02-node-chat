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




	socket.on('createMessage',(message)=>{
		console.log('createMessage',message)

	})

	socket.emit('newMessage',{
		from:'Sebas',
		text:'See you',
		createdAt:123
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