function getEnglishMonths(){
	return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

function getCurrentDayName() {
	var t = new Date(),
		e = t.getDay(),
		n = Array(7)
	return (
		(n[0] = 'Sunday'),
		(n[1] = 'Monday'),
		(n[2] = 'Tuesday'),
		(n[3] = 'Wednesday'),
		(n[4] = 'Thursday'),
		(n[5] = 'Friday'),
		(n[6] = 'Saturday'),
		n[e]
	)
}

module.exports = {
	getCurrentDayName,
	getEnglishMonths
}
