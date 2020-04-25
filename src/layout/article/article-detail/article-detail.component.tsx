import React from 'react'
import { ImageBackground, View, Share } from 'react-native'
import { ThemedComponentProps, ThemeType, withStyles } from 'react-native-ui-kitten/theme'
import { Avatar, Text, Button } from 'react-native-ui-kitten/ui'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { np } from '../../../lang/np'
import { getRelativeTime } from '../../../helper/time'
import { ClockIconOutline } from '../../../assets/icons'
import { ArticleActivityBar } from '../../../components/articles'
import { ContainerView, textStyle } from '../../../components/common'

interface ComponentProps {
	article
	navigation: any
}

export type ArticleDetailComponentProps = ThemedComponentProps & ComponentProps

class ArticleDetailComponent extends React.Component<ArticleDetailComponentProps> {
	public render(): React.ReactNode {
		const { themedStyle, article } = this.props
		const { READ_MORE } = np.public
		const BackIcon = (
			<AntDesign
				name="back"
				size={24}
				color="grey"
				onPress={this.navigateBack}
				style={{
					padding: 8,
				}}
			/>
		)
		const shareButton = (
			<AntDesign
				name="sharealt"
				size={24}
				color="grey"
				onPress={this.shareButtonClick}
				style={{
					padding: 8,
				}}
			/>
		)

		return (
			<ContainerView style={themedStyle.container}>
				<View style={themedStyle.headerStyle}>
					{BackIcon}
					{shareButton}
				</View>
				<ImageBackground style={themedStyle.image} source={{ uri: article.imageLink }}>
					<Avatar style={themedStyle.authorPhoto} size="large" source={{ uri: article.source.logoLink }} />
				</ImageBackground>

				<View style={themedStyle.detailsContainer}>
					<Text style={themedStyle.titleLabel} category="h5">
						{article.title}
					</Text>
					<ArticleActivityBar>
						<View style={themedStyle.dateContainer}>
							{ClockIconOutline(themedStyle.dateIcon)}
							<Text style={themedStyle.dateLabel} appearance="hint" category="p2">
								{getRelativeTime(article.publishedDate)}
							</Text>
						</View>
					</ArticleActivityBar>
					<Text category="s1" style={themedStyle.contentLabel}>
						{article.content}
					</Text>
					<View style={themedStyle.readMoreBtnWrapper}>
						<Button onPress={this.handleLinkClick} style={themedStyle.readMoreBtn}>
							{READ_MORE}
						</Button>
					</View>
				</View>
			</ContainerView>
		)
	}

	private navigateBack = () => {
		this.props.navigation.goBack()
	}

	private shareButtonClick = () => {
		const { title, link } = this.props.article
		Share.share({
			message: title + '  ' + link,
			url: link,
			title: title,
		})
	}

	private handleLinkClick = () => {
		const link = this.props.article.link
		this.props.navigation.navigate('Article', { link })
	}
}

export const ArticleDetail = withStyles(ArticleDetailComponent, (theme: ThemeType) => ({
	container: {
		flex: 1,
		backgroundColor: theme['background-basic-color-1'],
	},
	detailsContainer: {
		paddingHorizontal: 24,
		paddingVertical: 4,
	},
	dateContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	image: {
		minHeight: 175,
		borderWidth: 1,
		borderColor: '#f5f7fa',
	},
	authorPhoto: {
		position: 'absolute',
		left: 24,
		bottom: -32,
		margin: 0,
		borderWidth: 2,
		borderColor: theme['border-basic-color-2'],
	},
	titleLabel: {
		marginTop: 30,
		...textStyle.headline,
		fontSize: 22,
	},
	contentLabel: {
		flex: 1,
		marginVertical: 12,
		...textStyle.paragraph,
		fontSize: 18,
	},
	dateIcon: {
		width: 16,
		height: 16,
		tintColor: theme['text-hint-color'],
	},
	dateLabel: {
		marginLeft: 4,
		...textStyle.paragraph,
	},
	headerStyle: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10,
	},
	readMoreBtnWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 8,
	},
	readMoreBtn: {
		width: 200,
	},
}))
