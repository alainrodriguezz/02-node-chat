const generateMessage = (from,text)=>{
	return {
		from,
		text,
		createdAt:new Date().getTime()
	}
}


const generateLocationMessage = (from,lat,lng)=>{
	return {
		from,
		url:`https://www.google.com.pe/maps/search/${lat},${lng}`,
		createdAt:new Date().getTime()
	}
}

module.exports = {generateMessage,generateLocationMessage}