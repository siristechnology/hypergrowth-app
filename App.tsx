import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ApplicationProvider } from 'react-native-ui-kitten'
import { mapping, light as lightTheme } from '@eva-design/eva'
import { AppearanceProvider } from 'react-native-appearance'
import auth from '@react-native-firebase/auth'
import crashlytics from '@react-native-firebase/crashlytics'

import { Main } from './src/main'
import ErrorBoundary from './src/error/error-boundry'
import RNBootSplash from 'react-native-bootsplash'

export default function App() {
	useEffect(() => {
		RNBootSplash.hide()
		signInAnonymously()
	}, [])

	return (
		<SafeAreaProvider>
			<ApplicationProvider mapping={mapping} theme={lightTheme}>
				<AppearanceProvider>
					<ErrorBoundary>
						<Main />
					</ErrorBoundary>
				</AppearanceProvider>
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
