import React from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { DefaultTheme } from '@react-navigation/native'

import { ArticleWebviewComponent } from './components'
// import { BottomTabScreen } from './screens/navigation/bottom-navigation.screen'
import { BottomTabs } from './bottomTabs'
import ArticleDetailScreen from './layout/article/article-detail/article-detail.container'
import { Details } from './details'

const Stack = createStackNavigator()

export const RootNavigator = () => {
	return (
		<NavigationContainer theme={DefaultTheme}>
			<Stack.Navigator initialRouteName="Tab" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Tab" component={BottomTabs} />
				<Stack.Screen name="Details" component={Details} options={{ headerTitle: 'Tweet' }} />
				<Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
				<Stack.Screen name="Article" component={ArticleWebviewComponent} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
