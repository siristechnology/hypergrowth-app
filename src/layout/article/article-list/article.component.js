import React from 'react'
import { View, TouchableOpacity, Linking } from 'react-native'
import { Avatar, Text } from '@ui-kitten/components/ui'
import { withStyles } from '@ui-kitten/components/theme'

import { textStyle } from '../../../components/common'
import { ArticleActivityBar } from '../../../components/articles'
import { ClockIconOutline } from '../../../assets/icons'
import { getRelativeTime } from '../../../helper/time'

const ArticleListItemCompoent = (props) => {
	const { article, eva.style } = props

	const onPress = () => {
		props.onPress(article)
	}

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[eva.style.container]}>
			<View style={eva.style.tweetWrapper}>
				<View style={eva.style.leftWrapper}>
					<Avatar
						source={{ uri: (article.imageUrl.includes('data:image') && article.source.logoLink) || article.imageUrl }}
						style={eva.style.avatar}
						size="giant"
					/>
				</View>
				<View style={eva.style.rightWrapper}>
					<View style={eva.style.headerWrapper}>
						<Text style={eva.style.titleLabel} category="h6">
							{article.headline}
						</Text>
					</View>
					<Text appearance="hint">{article.shortDescription ? article.shortDescription.substring(0, 100) + '...' : ''}</Text>
					<ArticleActivityBar style={eva.style.detailsContainer}>
						<View style={eva.style.dateContainer}>
							{ClockIconOutline(eva.style.dateIcon)}
							<Text style={eva.style.dateLabel} appearance="hint" category="p2">
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
		fontWeight: 'bold',
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
