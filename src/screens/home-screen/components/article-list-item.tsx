import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Avatar, Text } from 'react-native-ui-kitten/ui'
import { withStyles } from 'react-native-ui-kitten/theme'

import { textStyle } from '../../../components/common'
import { ArticleActivityBar } from '../../../components/articles'
import { ClockIconOutline } from '../../../assets/icons'
import { getRelativeTime } from '../../../helper/time'

const ArticleListItemCompoent = (props) => {
	const { article, navigation, themedStyle } = props

	const onPress = () => {
		navigation.navigate('ArticleDetail', { article })
	}

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[themedStyle.container]}>
			<View style={themedStyle.tweetWrapper}>
				<View style={themedStyle.leftWrapper}>
					<Avatar
						source={{ uri: (article.imageUrl.includes('data:image') && article.source.logoLink) || article.imageUrl }}
						style={themedStyle.avatar}
						size="giant"
					/>
				</View>
				<View style={themedStyle.rightWrapper}>
					<View style={themedStyle.headerWrapper}>
						<Text style={themedStyle.titleLabel} category="h6">
							{article.headline}
						</Text>
					</View>
					<Text appearance="hint">{article.summary ? article.summary.substring(0, 100) + '...' : ''}</Text>
					<ArticleActivityBar style={themedStyle.detailsContainer}>
						<View style={themedStyle.dateContainer}>
							{ClockIconOutline(themedStyle.dateIcon)}
							<Text style={themedStyle.dateLabel} appearance="hint" category="p2">
								{getRelativeTime(article.createdDate)}
							</Text>
						</View>
					</ArticleActivityBar>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export const ArticleListItem = withStyles(ArticleListItemCompoent, (theme) => ({
	container: {
		marginVertical: 0.6,
		backgroundColor: '#FFFFFF',
	},
	tweetWrapper: {
		padding: 4,
		marginVertical: 6,
		flexDirection: 'row',
	},
	rightWrapper: {
		flex: 1,
	},
	headerWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		paddingBottom: 4,
		alignItems: 'center',
	},
	avatar: {
		minWidth: 40,
		margin: 10,
	},
	titleLabel: {
		...textStyle.caption1,
	},
	descriptionLabel: {
		marginLeft: 4,
		...textStyle.subtitle,
	},
	detailsContainer: {
		paddingTop: 2,
	},
	tweetText: {
		flex: 1,
		flexWrap: 'wrap',
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
	},
	dateLabel: {
		marginLeft: 2,
		...textStyle.paragraph,
	},
	dateIcon: {
		width: 12,
		height: 12,
		tintColor: theme['text-hint-color'],
	},
}))
