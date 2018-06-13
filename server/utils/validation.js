var isRealString = (str) =>{
	return (typeof str === 'string' && str.trim().length > 0)
}

var cleanRoomName = (str) =>{
	return capitalizeFirstLetterAndLowerTheRest(str.trim())
}

function capitalizeFirstLetterAndLowerTheRest(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


module.exports = {isRealString,cleanRoomName}