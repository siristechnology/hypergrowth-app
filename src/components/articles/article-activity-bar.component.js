import React from 'react'
import { withStyles } from '@ui-kitten/components/theme'

import { ActivityBar } from '../../components/common'

const ArticleActivityBarComponent = (props) => {
	const { textStyle, likes, children, ...restProps } = props
	return <ActivityBar {...restProps}>{children}</ActivityBar>
}

export const ArticleActivityBar = withStyles(ArticleActivityBarComponent, (theme) => ({}))
