import React from 'react'
import { Button } from '@ui-kitten/components'
import { StyleSheet, Text, View } from 'react-native'

import { en } from '../lang/en'

const SplashScreenComponent = ({ onRefresh = (f) => f }) => {
	const {
		public: { REFRESH, APP_NAME },
	} = en
	const viewStyles = [styles.container, { backgroundColor: 'skyblue' }]
	return (
		<View style={viewStyles}>
			<Text style={styles.heading}>{APP_NAME}</Text>
			<Button onPress={onRefresh} style={styles.refreshBtn}>
				<Text style={styles.wait}>{REFRESH}</Text>
			</Button>
		</View>
	)
}
export { SplashScreenComponent }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},

	heading: {
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
	},
	refreshBtn: {
		alignSelf: 'center',
		backgroundColor: '#ccccff',
	},
	wait: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		margin: 10,
	},
})
