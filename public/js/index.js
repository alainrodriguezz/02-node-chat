const socket = io()

socket.on('connect',function(){
	console.log('connected to server')

})





socket.on('newMessage',function(msg){
	console.log('Got new Message',msg)
})







socket.on('disconnect',function(){
	console.log('disconnected from server')
})

var createMessage = function(from,text){
	socket.emit('createMessage',{
		from:from,
		text:text
	})
}

