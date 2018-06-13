const socket = io()


socket.on('connect',function(){
	console.log('connected to server')

})





socket.on('newMessage',function(msg){

	var formattedTime = moment(msg.createdAt).format('h:mm a')

	var template	 = $('#message-template').html()
	var html = Mustache.render(template,{
		text:msg.text,
		from:msg.from,
		createdAt:formattedTime
	})

	$('#messages').append(html)

	

	// var li = $('<li></li>')
	// li.text(`${msg.from} ${formattedTime} : ${msg.text}`)

	// $('#messages').append(li)
})

socket.on('newLocationMessage',function(msg){

	var formattedTime = moment(msg.createdAt).format('h:mm a')

	var template = $('#location-message-template').html()
	var html = Mustache.render(template,{
		from:msg.from,
		url:msg.url,
		createdAt:formattedTime
	})

	$('#messages').append(html)
	// var li = $('<li></li>')
	// var a = $(`<a target="_blank" href="${msg.url}">This is my location</a>`)

	// $(li).text(`${msg.from} ${formattedTime}: `)
	// $(li).append(a)
	// $('#messages').append(li)

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

