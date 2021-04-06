import React from 'react'
import { View, TouchableNativeFeedback } from 'react-native'
import { Text } from '@ui-kitten/components/ui'
import { withStyles } from '@ui-kitten/components/theme'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { textStyle } from '../../../components/common'
import { ArticleActivityBar } from '../../../components/articles'
import { ClockIconOutline } from '../../../assets/icons'
import { getRelativeTime } from '../../../helper/time'
import TextAvatar from '../../../components/text-avatar'

const ArticleListItemCompoent = (props) => {
	const { article, navigation, eva } = props

	const onPress = () => {
		navigation.navigate('ArticleDetail', { article })
	}

	return (
		<TouchableNativeFeedback onPress={onPress} style={[eva.style.container]}>
			<View style={eva.style.itemWrapper}>
				<View style={eva.style.leftWrapper}>
					<TextAvatar text={article.relatedStocks[0].symbol} />
				</View>
				<View style={eva.style.rightWrapper}>
					<View style={eva.style.headerWrapper}>
						<Text style={eva.style.titleLabel} category="h6">
							{article.headline}
						</Text>
					</View>
					<Text appearance="hint">{article.summary ? article.summary.substring(0, 100) + '...' : ''}</Text>
					<ArticleActivityBar style={eva.style.detailsContainer}>
						<View style={eva.style.bottomLabelContainer}>
							{ClockIconOutline(eva.style.dateIcon)}
							<Text style={eva.style.bottomLabel} appearance="hint" category="p2">
								{getRelativeTime(article.publishedDate)}
							</Text>
						</View>
						<View style={eva.style.bottomLabelContainer}>
							<MaterialCommunityIcons name="equalizer-outline" size={12} color={'gray'} />
							<Text style={eva.style.bottomLabel} appearance="hint" category="p2">
								{article.relatedStocks[0].changePercent?.toFixed(2) || 0}%
							</Text>
						</View>
					</ArticleActivityBar>
				</View>
			</View>
		</TouchableNativeFeedback>
	)
}

export const ArticleListItem = withStyles(ArticleListItemCompoent, (theme) => ({
	container: {
		marginVertical: 0.6,
	},
	itemWrapper: {
		paddingHorizontal: 4,
		paddingVertical: 8,
		flexDirection: 'row',
		backgroundColor: 'white',
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
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		marginTop: 6,
	},
	tweetText: {
		flex: 1,
		flexWrap: 'wrap',
	},
	bottomLabelContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 6,
	},
	bottomLabel: {
		marginLeft: 2,
		...textStyle.paragraph,
	},
	dateIcon: {
		width: 12,
		height: 12,
		tintColor: theme['text-hint-color'],
	},
	icon: {
		color: theme['text-hint-color'],
	},
}))
