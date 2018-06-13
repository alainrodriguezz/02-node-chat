const _ = require('lodash')

class Users{
	constructor(){
		this.users = []
	}

	addUser(id,name,room){
		var user = {id,name,room}
		this.users.push(user)
		return user
	}

	removeUser(id){

		var user = this.getUser(id)

		if(user){
			this.users = this.users.filter((user)=>user.id!==id)
		}
		
		return user
	}

	getUser(id){
		var user = this.users.filter((user)=>user.id===id)
		return user[0]
	}

	getUserByName(name){
		var user = this.users.filter((user)=>user.name===name)
		return user[0]
	}

	getUserList(room){
		var users = this.users.filter((user)=> user.room === room)
		var namesArray = users.map((user)=> user.name)

		return namesArray
	}

	getRoomList(){
		var rooms = this.users.map((user)=> user.room)
		rooms.push('Base')
		rooms = _.uniq(rooms)
		return rooms
	}
}

module.exports = {Users}