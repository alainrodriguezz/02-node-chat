const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'./../public')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

const {generateMessage} = require('./utils/message.js')

app.use(express.static(publicPath))



io.on('connection',(socket)=>{
	console.log('new SocketIO connection')

	//Welcome user (to me)
	socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat'))

	//Welcome user (to everyone)
	socket.broadcast.emit('newMessage',generateMessage('Admin','A new User has joined the Chat'))

	//Send message in Chat
	socket.on('createMessage',(message)=>{
		console.log('createMessage',message)
		io.emit('newMessage',generateMessage(from:message.from,text:message.text))
	})






	socket.on('disconnect',()=>console.log('SocketIO disconnected'))
})


server.listen(port,()=>console.log(`connected on ${port}`))
