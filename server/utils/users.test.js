const expect = require('expect')
const {Users} = require('./users')


describe('Users Class',()=>{

	var users

	beforeEach(()=>{
		users = new Users()

		users.users = [
		{
			id:'1',
			name:'Mike',
			room:'Node Course'
		},
		{
			id:'2',
			name:'Jen',
			room:'Node Course'
		},
		{
			id:'3',
			name:'Rob',
			room:'React Course'
		}]
	})

	it('Should add new User',(done)=>{
		
		var user = users.addUser('4','Alain','Sala')
		expect(typeof user).toBe('object')
		expect(users.users.length).toBe(4)
		done()
	})


	it('Should return names from node Course',(done)=>{
		var usersList = users.getUserList('Node Course')
		expect(usersList).toEqual(['Mike','Jen'])
		done()
	})

	it('Should remove a user',(done)=>{
		// console.log('Aun no Borrado',users.users)
		expect(users.removeUser('1')).toBeTruthy()
		// console.log('Borrado',users.users)
		done()
	})

	it('Should not remove a user',(done)=>{
		// console.log('Aun no Borrado',users.users)
		expect(users.removeUser('99')).toBeFalsy()		
		// console.log('Borrado',users.users)
		done()
	})

	it('Should find user',(done)=>{
		var user = users.getUser('1')
		expect(user).toBeTruthy()
		expect(user.id).toBe('1')
		done()

	})

	it('Should not find user',(done)=>{
		var user = users.getUser('noexiste')
		expect(user).toBeFalsy()
		done()		
	})
})