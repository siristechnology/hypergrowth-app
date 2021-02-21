import moment from 'moment'

moment.updateLocale('en', {
	relativeTime: {
		past: '%s ago',
		m: '1 minute',
		mm: '%d minute',
		h: '1 hour',
		hh: '%d hour',
		d: '1 day',
		dd: '%d day',
	},
})
export const getRelativeTime = (date) => {
	const convertedDate = Number(date)
	if (!isNaN(convertedDate) && typeof convertedDate === 'number') {
		return moment(convertedDate).startOf('hour').fromNow()
	} else {
		return moment(date).startOf('hour').fromNow()
	}
}
