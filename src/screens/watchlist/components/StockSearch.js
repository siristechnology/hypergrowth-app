import React, { useEffect } from 'react'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components'

const requestData = () => fetch('https://reactnative.dev/movies.json')
const requestDataWithDebounce = AwesomeDebouncePromise(requestData, 400)

const StockSearch = () => {
	const [query, setQuery] = React.useState('')
	const [data, setData] = React.useState([])

	useEffect(() => {
		requestDataWithDebounce()
			.then((response) => response.json())
			.then((json) => json.movies)
			.then((options) => {
				return options.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
			})
			.then(setData)
	}, [query])

	const onSelect = (index: number) => {
		setQuery(data[index].title)
	}

	const onChangeText = (nextQuery) => {
		setQuery(nextQuery)
	}

	const renderOption = (item, index) => <AutocompleteItem key={index} title={item.title} />

	return (
		<Autocomplete placeholder="Search Symbols: e.g. AAPL" value={query} onChangeText={onChangeText} onSelect={onSelect}>
			{data.map(renderOption)}
		</Autocomplete>
	)
}

export default StockSearch