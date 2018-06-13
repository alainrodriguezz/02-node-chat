const socket = io()

socket.on('connect',function(){
	console.log('connected to server')

})





socket.on('newMessage',function(msg){
	console.log('Got new Message',msg)

	var li = $('<li></li>')
	li.text(`${msg.from}: ${msg.text}`)

	$('#messages').append(li)
})







socket.on('disconnect',function(){
	console.log('disconnected from server')
})

var createMessage = function(from,text){
	socket.emit('createMessage',{
		from:from,
		text:text
	},function(data){
		console.log('Msg delivered')
	})
}



//Jquery Html
$(function(){

	$('#message-form').on('submit',function(e){
		e.preventDefault()

		createMessage('User',$('[name=message]').val())
	})

})

