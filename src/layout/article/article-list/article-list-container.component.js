import React from 'react'
import { CircularSpinner } from './../../../components/common'

import { ArticleList } from './article-list.component'

export const ArticleListContainer = ({ navigation, articles, refreshing, handleRefresh, headerComponent }) => {
	const onItemPress = (article) => {
		navigation.navigate('ArticleDetail', { article, articles })
	}

	return (
		((!articles || articles.length === 0) && <CircularSpinner />) || (
			<ArticleList
				headerComponent={headerComponent}
				articles={articles}
				onItemPress={onItemPress}
				refreshing={refreshing}
				handleRefresh={handleRefresh}
			/>
		)
	)
}
