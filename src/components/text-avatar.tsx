import React from 'react'
import { View, Text } from 'react-native'
import { withStyles } from '@ui-kitten/components'

const TextAvatar = ({ text, eva }) => (
	<View style={eva.style.container}>
		<View style={eva.style.outerCircle}>
			<View style={eva.style.innerCircle}>
				<Text>{text}</Text>
			</View>
		</View>
	</View>
)

export default withStyles(TextAvatar, (theme) => ({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5,
	},
	outerCircle: {
		borderRadius: 30,
		width: 60,
		height: 60,
		backgroundColor: theme['border-basic-color-4'],
	},
	innerCircle: {
		borderRadius: 25,
		width: 50,
		height: 50,
		margin: 5,
		opacity: 1,
		backgroundColor: 'white',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
}))
