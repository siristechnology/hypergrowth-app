import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { StatusBar } from 'react-native'
import { ApplicationProvider } from 'react-native-ui-kitten'
import { mapping, light as lightTheme } from '@eva-design/eva'

import { store } from './src/store'
import AppContainer from './src/frame/app-container'
import ErrorBoundary from './src/error/error-boundry'
import notificationHandler from './src/services/notification-handler'
import crashlytics from '@react-native-firebase/crashlytics'
import auth from '@react-native-firebase/auth'
import AppLayout from './src/frame/app-layout'
import { CircularSpinner } from './src/components/common'
import RNBootSplash from 'react-native-bootsplash'
import PushNotification from 'react-native-push-notification'

const App = () => {
	const [clicked, setClicked] = useState(false)
	const [loading, setLoading] = useState(false)
	const [article, setArticle] = useState({})

	const onRegister = (token) => {
		signInAnonymously().then(() => notificationHandler.register(auth().currentUser, token.token))
	}

	const onNotif = (notif) => {
		if (notif._id && notif.foreground === false) {
			setLoading(true)
			notificationHandler
				.handleNotificationClick(notif._id)
				.then((res) => {
					setArticle(res.data.getArticle)
					setClicked(true)
					setLoading(false)
				})
				.catch((err) => {
					crashlytics().recordError(err)
					setLoading(false)
				})
		}
	}

	const loadAppContainer = (articleToShow, notificationClicked) => {
		if (notificationClicked && articleToShow._id) {
			return <AppContainer initialScreenName="ArticleDetail" initialParams={{ article: articleToShow }} />
		} else {
			return <AppContainer />
		}
	}

	useEffect(() => {
		RNBootSplash.hide()
		PushNotification.configure({
			onRegister: onRegister,
			onNotification: onNotif,
		})
	}, [])

	return (
		<ApplicationProvider mapping={mapping} theme={lightTheme}>
			<Provider store={store}>
				<StatusBar barStyle="light-content" />
				<ErrorBoundary>
					{(loading && (
						<AppLayout>
							<CircularSpinner />
						</AppLayout>
					)) ||
						loadAppContainer(article, clicked)}
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
