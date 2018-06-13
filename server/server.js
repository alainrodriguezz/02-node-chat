const path = require('path')
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')
const {generateMessage,generateLocationMessage} = require('./utils/message.js')

const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'./../public')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const users = new Users()



app.use(express.static(publicPath))



io.on('connection',(socket)=>{
	console.log('new SocketIO connection')

	//Join Room
	socket.on('join',(params,callback)=>{
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and Room Name are required')
		}

		//Join Room
		socket.join(params.room)

		//Users List
		users.removeUser(socket.id)
		users.addUser(socket.id,params.name,params.room)
		io.to(params.room).emit('updateUserList',users.getUserList(params.room))

		//Welcome user (to me)
		socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat'))

		//Welcome user (to everyone)
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined the Chat`))


		callback()
	})


	//Send message in Chat
	socket.on('createMessage',(message,callback)=>{
		console.log('createMessage',message)
		io.emit('newMessage',generateMessage(message.from,message.text))
		callback()
	})

	//Send location
	socket.on('createLocationMessage',(location,callback)=>{
		io.emit('newLocationMessage',generateLocationMessage('Admin',location.lat,location.lng))
	})

	//Update users online
	socket.on('updateUserList',()=>{

	})






	socket.on('disconnect',()=>{
		var user = users.removeUser(socket.id)
		if(user){
			io.to(user.room).emit('updateUserList',users.getUserList(user.room))
			io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`))
		}
	})
})


server.listen(port,()=>console.log(`connected on ${port}`))
