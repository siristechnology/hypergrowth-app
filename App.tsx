import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components'
import { AppearanceProvider } from 'react-native-appearance'
import auth from '@react-native-firebase/auth'
import crashlytics from '@react-native-firebase/crashlytics'

import { Main } from './src/main'
import ErrorBoundary from './src/error/error-boundry'
import RNBootSplash from 'react-native-bootsplash'

const HomeScreen = () => (
	<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<Text category="h1">sss</Text>
	</Layout>
)

export default function App() {
	useEffect(() => {
		RNBootSplash.hide()
		signInAnonymously()
	}, [])

	return (
		<SafeAreaProvider>
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<ErrorBoundary>
					<Main />
				</ErrorBoundary>
			</ApplicationProvider>
		</SafeAreaProvider>
	)
}

const signInAnonymously = () => {
	return auth()
		.signInAnonymously()
		.catch((error) => {
			crashlytics().recordError(error)
		})
}
