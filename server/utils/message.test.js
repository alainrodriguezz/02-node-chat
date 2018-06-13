const expect = require('expect')
const {generateMessage,generateLocationMessage} = require('./message')

describe('Generate Message',()=>{

	it('Should generate message object',(done)=>{

		let msg = generateMessage('Admin','Hola')
		expect(typeof msg).toBe('object')
		expect(msg.from).toBe('Admin')
		expect(msg.text).toBe('Hola')
		expect(typeof msg.createdAt).toBe('number')
		done()
	})
})



describe('Generate Location Message',()=>{

	it('Should generate a location message object',(done)=>{

		let msg = generateLocationMessage('Admin',1,2)
		expect(typeof msg).toBe('object')
		expect(msg.from).toBe('Admin')
		expect(msg.url).toBe('https://www.google.com.pe/maps/search/1,2')
		expect(typeof msg.createdAt).toBe('number')
		done()
	})
})