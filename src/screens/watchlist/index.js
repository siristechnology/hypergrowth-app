import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import TrendingListContainer from './components/trendingListContainer'
import crashlytics from '@react-native-firebase/crashlytics'
import { DataTable } from 'react-native-paper'

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

	const trendings = (data && data.getArticles) || []

	return (
		<AppLayout>
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>Watchlist</Text>
			</View>
			<DataTable>
				<DataTable.Header>
					<DataTable.Title style={style.tableHeaderStyle}>Dessert</DataTable.Title>
					<DataTable.Title style={style.tableHeaderStyle}>Dessert</DataTable.Title>
					<DataTable.Title style={style.tableHeaderStyle}>Dessert</DataTable.Title>
					<DataTable.Title numeric>Calories</DataTable.Title>
					<DataTable.Title numeric>Fat</DataTable.Title>
				</DataTable.Header>

				<DataTable.Row>
					<DataTable.Cell>Frozen yogurt</DataTable.Cell>
					<DataTable.Cell numeric>159</DataTable.Cell>
					<DataTable.Cell numeric>6.0</DataTable.Cell>
				</DataTable.Row>

				<DataTable.Row>
					<DataTable.Cell>Ice cream sandwich</DataTable.Cell>
					<DataTable.Cell numeric>237</DataTable.Cell>
					<DataTable.Cell numeric>8.0</DataTable.Cell>
				</DataTable.Row>
			</DataTable>

			<TrendingListContainer trending={trendings} refreshing={refreshing} onRefresh={handleRefresh} />
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
		getArticles {
			_id
			title
			shortDescription
			content
			link
			imageLink
			createdDate
			modifiedDate
			category
			source {
				name
				logoLink
			}
		}
	}
`

export default TrendingComponent
