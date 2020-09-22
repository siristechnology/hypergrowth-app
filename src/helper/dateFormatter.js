import { getCurrentDayName, getEnglishMonths } from './dateConverter'

const getFormattedCurrentEnglishDate = () => {
	const currentDate = new Date()
	const dayName = getCurrentDayName()
	const monthName = getEnglishMonths()[currentDate.getMonth()]
	const date = currentDate.getDate()
	return `${dayName}, ${monthName} ${date}` 
}

export { getFormattedCurrentEnglishDate }