const expect = require('expect')
const {generateMessage} = require('./message')

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