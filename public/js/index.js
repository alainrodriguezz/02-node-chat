const socket = io()

socket.on('connect',function(){
	console.log('connected to server')

})





socket.on('newMessage',function(msg){

	var li = $('<li></li>')
	li.text(`${msg.from}: ${msg.text}`)

	$('#messages').append(li)
})

socket.on('newLocationMessage',function(msg){

	var li = $('<li></li>')
	var a = $(`<a target="_blank" href="${msg.url}">This is my location</a>`)

	$(li).text(`${msg.from}: `)
	$(li).append(a)
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
		$('[name=message]').val('')
	})


	var locationBtn = $('#send-location')
	locationBtn.on('click',function(){
		console.log('here')
		if(!navigator.geolocation) return alert('Geolocation not supported')

		locationBtn.attr('disabled','disabled').text('Sending location..')
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position)
			locationBtn.removeAttr('disabled').text('Send location')

			socket.emit('createLocationMessage',{
				lat:position.coords.latitude,
				lng:position.coords.longitude
			})

		},function(){
			alert('Unable to fetch location')
		})
	})
})

