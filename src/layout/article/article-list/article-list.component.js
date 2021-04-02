import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { withStyles } from '@ui-kitten/components/theme'
import { useScrollToTop } from '@react-navigation/native'

import { ArticleListItem } from './article.component'

const ArticleListComponent = React.memo(({ articles, onItemPress, eva, refreshing, handleRefresh, headerComponent }) => {
	const _onItemPress = (article) => {
		onItemPress(article)
	}

	const renderItem = ({ item, index }) => {
		return <ArticleListItem style={eva.style.item} article={item} onPress={() => _onItemPress(item)} />
	}

	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<FlatList
			ListHeaderComponent={headerComponent}
			contentContainerStyle={eva.style.container}
			data={articles}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
			ref={ref}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#0000ff', '#689F38']} />}
		/>
	)
})

export const ArticleList = withStyles(ArticleListComponent, (theme) => ({
	container: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: theme['background-basic-color-1'],
	},
	item: {
		marginVertical: 4,
		backgroundColor: theme['background-basic-color-1'],
		borderBottomWidth: 1,
		borderBottomColor: '#F5F0F0',
	},
}))
