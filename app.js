import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import RNBootSplash from 'react-native-bootsplash'

const App = () => {
	useEffect(() => {
		RNBootSplash.hide()
		signInAnonymously()
	}, [])

	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<ErrorBoundary>
					<AppContainer />
				</ErrorBoundary>
			</Provider>
		</ApplicationProvider>
	)
}

const signInAnonymously = () => {
	return auth()
		.signInAnonymously()
		.catch((error) => {
			crashlytics().recordError(error)
		})
}

export default App
