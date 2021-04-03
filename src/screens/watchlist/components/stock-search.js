import React, { useEffect } from 'react'
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components'
import { gql, useLazyQuery, useMutation } from '@apollo/client'

const StockSearch = () => {
	const [searchTerm, setSearchTerm] = React.useState('')
	const [searchStocks, { data }] = useLazyQuery(SEARCH_STOCKS_QUERY, {
		variables: { searchTerm },
	})
	const [addStock, { data2 }] = useMutation(ADD_STOCK_MUTATION)

	useEffect(() => {
		let isMounted = true
		if (isMounted) searchStocks()

		console.log('searching again with ', searchTerm)

		return () => {
			isMounted = false
		}
	}, [searchStocks, searchTerm])

	const onSelect = (index: number) => {
		setSearchTerm(data.searchStocks[index].symbol)
		addStock({ variables: { symbol: data.searchStocks[index].symbol } })
	}

	const onChangeText = (nextQuery) => {
		setSearchTerm(nextQuery)
	}

	console.log('printing data2', data2)

	const renderOption = (item, index) => <AutocompleteItem key={index} title={item.symbol + ' | ' + item.company} />

	return (
		<Autocomplete placeholder="Search Symbols: e.g. AAPL" value={searchTerm} onChangeText={onChangeText} onSelect={onSelect}>
			{data && data.searchStocks.map(renderOption)}
		</Autocomplete>
	)
}

const SEARCH_STOCKS_QUERY = gql`
	query searchStocksQuery($searchTerm: String!) {
		searchStocks(searchTerm: $searchTerm) {
			symbol
			company
		}
	}
`

const ADD_STOCK_MUTATION = gql`
	mutation addStock($symbol: String!) {
		addStockToWatchList(symbol: $symbol) {
			success
			message
		}
	}
`

export default StockSearch
