import React from 'react'
import { ImageBackground, View, Share } from 'react-native'
import { ThemedComponentProps, ThemeType, withStyles } from '@ui-kitten/components/theme'
import { Avatar, Text, Button } from '@ui-kitten/components/ui'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { getRelativeTime } from '../../../helper/time'
import { ClockIconOutline } from '../../../assets/icons'
import { ArticleActivityBar } from '../../../components/articles'
import { ContainerView, textStyle } from '../../../components/common'
const APP_URL = 'https://play.google.com/store/apps/details?id=com.siristechnology.hypergrowth'

interface ComponentProps {
	article
	navigation: any
}

export type ArticleDetailComponentProps = ThemedComponentProps & ComponentProps

class ArticleDetailComponent extends React.PureComponent<ArticleDetailComponentProps> {
	public render(): React.ReactNode {
		const { eva, article } = this.props
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
			<View style={eva.style.articleContainerView}>
				<View style={eva.style.headerStyle}>
					{BackIcon}
					{shareButton}
				</View>
				<ContainerView style={eva.style.container}>
					<ImageBackground
						style={[eva.style.image, { height: 175 }]}
						source={{ uri: (article.imageUrl.includes('data:image') && article.source.logoLink) || article.imageUrl }}
						imageStyle={{ resizeMode: 'cover' }}
					>
						<Avatar style={eva.style.authorPhoto} size="large" source={{ uri: article.source.logoLink }} />
					</ImageBackground>

					<View style={eva.style.detailsContainer}>
						<Text style={eva.style.titleLabel} category="h5">
							{article.headline}
						</Text>
						<ArticleActivityBar>
							<View style={eva.style.dateContainer}>
								{ClockIconOutline(eva.style.dateIcon)}
								<Text style={eva.style.dateLabel} appearance="hint" category="p2">
									{getRelativeTime(article.createdDate)}
								</Text>
							</View>
						</ArticleActivityBar>
						<Text category="s1" style={eva.style.contentLabel}>
							{article.summary}
						</Text>
						{article.tags && article.tags.length > 0 && (
							<View style={eva.style.tagsView}>
								{article.tags.map((tag, i) => (
									<Text key={i} style={eva.style.tags}>
										#{tag}{' '}
									</Text>
								))}
							</View>
						)}
						<View style={eva.style.readMoreBtnWrapper}>
							<Button onPress={this.handleLinkClick} style={eva.style.readMoreBtn}>
								READ MORE
							</Button>
						</View>
					</View>
				</ContainerView>
			</View>
		)
	}

	private navigateBack = () => {
		this.props.navigation.goBack()
	}

	private shareButtonClick = () => {
		const { title, link } = this.props.article
		Share.share({
			message: title + '  ' + link + ' #HyperGrowthApp ' + APP_URL,
			url: link,
			title: title,
		})
	}

	private handleLinkClick = () => {
		const link = this.props.article.url
		this.props.navigation.navigate('Article', { link })
	}
}

export const ArticleDetail = withStyles(ArticleDetailComponent, (theme: ThemeType) => ({
	articleContainerView: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: theme['background-basic-color-1'],
	},
	detailsContainer: {
		paddingHorizontal: 24,
		paddingVertical: 4,
	},
	dateContainer: {
		marginTop: 2,
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
		backgroundColor: theme['background-basic-color-1'],
		borderColor: theme['border-basic-color-4'],
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
	tags: {
		marginVertical: 7,
		fontSize: 16,
		fontWeight: 'bold',
		marginRight: 2,
	},
	dateIcon: {
		width: 13,
		height: 13,
		marginBottom: 2,
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
	tagsView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 7,
	},
}))
