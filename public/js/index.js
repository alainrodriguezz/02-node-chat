const socket = io()


socket.on('connect',function(){

	socket.emit('getRooms')
})

socket.on('getRooms',function(rooms){
	console.log('rooms',rooms)
	rooms.forEach(function(room){
		var select = '<option value="'+room+'">'+room+'</option>'
		$("#rooms-list").append(select)
	})

	var createNewRoom = '<option value="CreateNewRoom">Create new Room</option>'
	$("#rooms-list").append(createNewRoom)
	
})

socket.on('disconnect',function(){
	console.log('disconnected')
})



$(function(){
	$('#rooms-list').on('change',function(){
		if($(this).val()=== 'CreateNewRoom'){
			$("#join-room-option").hide()
			$("#create-new-room-option").show()
			$("#create-new-room-option input").focus()
		}

	})

	$("form").submit(function(){
		if($("#create-new-room-option input").val()===''){
			$("#create-new-room-option input").val($("#rooms-list").val())
		}
		return true
	})
})