import React from 'react'
import { FlatList, View, StyleSheet, Text, RefreshControl } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { useScrollToTop } from '@react-navigation/native'
import crashlytics from '@react-native-firebase/crashlytics'

import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListItem } from './components/article-list-item'

export default (props) => {
	const ref = React.useRef(null)
	useScrollToTop(ref)

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY)

	if (error) {
		crashlytics().recordError(error)
	}

	const articles = (data && data.getStockNews) || []

	const renderItem = ({ item }) => {
		return <ArticleListItem article={item} navigation={props.navigation} />
	}

	const headerItem = () => {
		return (
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>{'Nasdaq: 0.23  S&P 0.45'}</Text>
			</View>
		)
	}

	return (
		<AppLayout>
			{articles.length > 0 && (
				<FlatList
					ListHeaderComponent={headerItem}
					data={articles}
					renderItem={renderItem}
					keyExtractor={(article) => article._id}
					ref={ref}
					refreshControl={<RefreshControl refreshing={articles.length == 0} onRefresh={refetch} colors={['#0000ff', '#689F38']} />}
				/>
			)}
			{loading && articles.length == 0 && <CircularSpinner />}
		</AppLayout>
	)
}

export const GET_ARTICLES_QUERY = gql`
	query homeScreenQuery {
		getStockNews {
			_id
			source
			headline
			summary
			url
			imageUrl
			publishedDate
			relatedStockSymbols
			relatedStocks {
				_id
				symbol
				changePercent
			}
		}
	}
`

const style = StyleSheet.create({
	headerStyle: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	textStyle: {
		fontSize: 20,
		paddingTop: 5,
	},
})
