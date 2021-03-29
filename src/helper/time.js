import moment from 'moment'

moment.updateLocale('en', {
	relativeTime: {
		past: '%s',
		m: '1m',
		mm: '%dm',
		h: '1h',
		hh: '%dh',
		d: '1d',
		dd: '%dd',
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
