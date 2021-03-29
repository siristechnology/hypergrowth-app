import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import crashlytics from '@react-native-firebase/crashlytics'
import SortableList from './components/sortable-list'

const TrendingComponent = () => {
	const [refreshing, setRefreshing] = useState(false)

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	const { loading, data, refetch, error } = useQuery(GET_WATCHLIST_QUERY, {
		variables: {},
	})

	if (error) {
		crashlytics().recordError(new Error('Api error' + error.message))
	}

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	}

	return (
		<AppLayout>
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>Watchlist</Text>
			</View>
			<SortableList data={data.getWatchList} onRefresh={handleRefresh} refreshing={refreshing} />
		</AppLayout>
	)
}

const style = StyleSheet.create({
	headerStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	tableHeaderStyle: {
		width: 300,
	},
	textStyle: {
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
})

export const GET_WATCHLIST_QUERY = gql`
	query watchlistQuery {
		getWatchList {
			symbol
			price
			change
		}
	}
`

export default TrendingComponent
