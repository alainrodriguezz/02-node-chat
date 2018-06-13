const socket = io()


socket.on('connect',function(){
	console.log('connected to server')
	var params = $.deparam(window.location.search)

	socket.emit('join',params,function(err){
		if(err)	{
			alert(err)
			window.location.href = '/'
		}else{
			console.log('no error')
		}
	})
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
	scrollToBottom()
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
	scrollToBottom()
})

socket.on('updateUserList',function(users){
	console.log('UsersList',users)

	var ol = $('<ol></ol>')

	users.forEach(function(user){
		ol.append($('<li></li>').text(user))
	})
	$('#users').html(ol)
})












socket.on('disconnect',function(){
	console.log('disconnected from server')
})

var createMessage = function(text){
	socket.emit('createMessage',{
		text:text
	},function(data){

	})
}



//Jquery Html
$(function(){

	$('#message-form').on('submit',function(e){
		e.preventDefault()

		createMessage($('[name=message]').val())
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


function scrollToBottom(){
	//selectors
	var messages = $('#messages')
	var newMessage = messages.children('li:last-child')

	//heights
	var clientHeight = messages.prop('clientHeight')
	var scrollTop = messages.prop('scrollTop')
	var scrollHeight = messages.prop('scrollHeight')
	var newMessageHeight = newMessage.innerHeight()
	var lastMessagesHeight = newMessage.prev().innerHeight()

	if(clientHeight+scrollTop + newMessageHeight + lastMessagesHeight>= scrollHeight){
		console.log('should scroll')
		messages.scrollTop(scrollHeight)
	}
}