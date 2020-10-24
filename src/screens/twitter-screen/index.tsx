import React, { useState } from 'react'
import { FlatList, View, StyleSheet, Text, RefreshControl } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { useTheme } from 'react-native-paper'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import AppLayout from '../../frame/app-layout'
import { CircularSpinner } from '../../components/common'

import { TweetComponent } from './components/tweet'
import { StackNavigatorParamlist } from './types'
import { useScrollToTop } from '@react-navigation/native'

type TweetProps = React.ComponentProps<typeof TweetComponent>

type Props = {
	navigation?: StackNavigationProp<StackNavigatorParamlist>
}

export default (props: Props) => {
	const theme = useTheme()
	const [refreshing, setRefreshing] = useState(false)
	const ref = React.useRef(null)
	useScrollToTop(ref)

	const { loading, data, refetch, error } = useQuery(GET_TWEETS_QUERY, {
		variables: {},
	})

	const handleRefresh = () => {
		setRefreshing(true)
		refetch().then(() => setRefreshing(false))
	}

	if (error) {
		console.log('Error here', error)
	}

	if (loading) {
		return (
			<AppLayout>
				<CircularSpinner />
			</AppLayout>
		)
	}

	const tweets = (data && data.getTweets && data.getTweets) || []
	const tweetsData = tweets.map((tweet) => ({ tweet }))

	const renderItem = ({ item }: { item: TweetProps }) => {
		return <TweetComponent {...item} />
	}

	const headerItem = () => {
		return (
			<View style={style.headerStyle}>
				<Text style={style.textStyle}>Trending Tweets</Text>
			</View>
		)
	}

	return (
		<AppLayout>
			<FlatList
				ListHeaderComponent={headerItem}
				contentContainerStyle={{ backgroundColor: theme.colors.background }}
				style={{ backgroundColor: theme.colors.background }}
				data={tweetsData}
				renderItem={renderItem}
				keyExtractor={(item) => item.tweet._id.toString()}
				ref={ref}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
			/>
		</AppLayout>
	)
}

const GET_TWEETS_QUERY = gql`
	query twitterScreenQuery {
		getTweets {
			_id
			text
			name
			tweetId
			handle
			profileImage
			description
			publishedDate
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
		fontWeight: 'bold',
		fontSize: 26,
		paddingTop: 5,
	},
})
