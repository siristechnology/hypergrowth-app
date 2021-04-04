import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Text, RefreshControl } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/client'
import { useScrollToTop } from '@react-navigation/native'
import crashlytics from '@react-native-firebase/crashlytics'

import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'
import { ArticleListItem } from './components/article-list-item'
import { StackNavigatorParamlist } from './types'

type TweetProps = React.ComponentProps<typeof ArticleListItem>

type Props = {
	navigation?: StackNavigationProp<StackNavigatorParamlist>
}

export default (props: Props) => {
	const theme = useTheme()
	const [refreshing, setRefreshing] = useState(false)
	const ref = React.useRef(null)
	useScrollToTop(ref)

	const { loading, data, refetch, error } = useQuery(GET_ARTICLES_QUERY)

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	if (error) {
		crashlytics().recordError(error)
	}

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	}

	const articles = (data && data.getStockNews) || []
	const articlesData = articles.map((article) => ({ article }))

	const renderItem = ({ item }: { item: TweetProps }) => {
		return <ArticleListItem {...item} navigation={props.navigation} />
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
			<FlatList
				ListHeaderComponent={headerItem}
				contentContainerStyle={{ backgroundColor: theme.colors.background }}
				style={{ backgroundColor: theme.colors.background }}
				data={articlesData}
				renderItem={renderItem}
				keyExtractor={(item) => item.article._id.toString()}
				ref={ref}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
			/>
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
				symbol
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
