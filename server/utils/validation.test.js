const expect = require('expect')
const {isRealString} = require('./validation')



describe('isRealString Method',()=>{

	it('Pass: Real string',(done)=>{
		expect(isRealString('asd')).toBe(true)
		done()
	})

	it('Not pass: a number',(done)=>{
		expect(isRealString(123)).toBe(false)
		done()
	})

	it('Not pass: empty string',(done)=>{
		expect(isRealString('   ')).toBe(false)
		done()
	})
})