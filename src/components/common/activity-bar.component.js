import React from 'react'
import { View } from 'react-native'
import { withStyles } from '@ui-kitten/components/theme'

const ActivityBarComponent = (props) => {
	const { style, eva, children, ...restProps } = props

	return (
		<View style={[eva.style.container, style]} {...restProps}>
			{children}
		</View>
	)
}

export const ActivityBar = withStyles(ActivityBarComponent, (theme) => ({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
}))
