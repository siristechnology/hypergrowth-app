import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import crashlytics from '@react-native-firebase/crashlytics'
import SortableList from './components/sortable-list'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Autocomplete } from 'react-native-ui-kitten'
import Autocomplete from 'react-native-autocomplete-input'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TrendingComponent = () => {
	const [refreshing, setRefreshing] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [showSearch, setShowSearch] = useState(false)

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

	const searchResult = ['aa', 'bb', 'cc'].filter((i) => i.indexOf(searchQuery) >= 0)

	return (
		<AppLayout>
			<View style={style.headerStyle}>
				<View>{!showSearch && <Text style={style.textStyle}>Watchlist</Text>}</View>
				<Icon name="magnify" size={24} color="#000" onPress={() => setShowSearch(true)} />
			</View>
			<SortableList data={data.getWatchList} onRefresh={handleRefresh} refreshing={refreshing} />
			{showSearch && (
				<View style={style.autocompleteContainer}>
					<Autocomplete
						keyExtractor={(item) => item}
						data={searchResult}
						defaultValue={searchQuery}
						onChangeText={(text) => setSearchQuery(text)}
						showSoftInputOnFocus={true}
						renderItem={({ item, i }) => (
							<TouchableOpacity onPress={() => setSearchQuery(item)}>
								<Text>{item}</Text>
							</TouchableOpacity>
						)}
						style={style.autocomplete}
					/>
					<Icon name="magnify" size={24} color="#000" onPress={() => setShowSearch(true)} />
				</View>
			)}
		</AppLayout>
	)
}

const style = StyleSheet.create({
	headerStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		padding: 10,
	},
	tableHeaderStyle: {
		width: 300,
	},
	textStyle: {
		fontSize: 20,
	},
	rightTopButtonContainer: {},
	autocompleteContainer: {
		flex: 1,
		position: 'absolute',
		paddingTop: 10,
		height: 120,
		left: 10,
		right: 100,
		// top: 0,
		zIndex: 1,
	},
	autocomplete: {},
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
