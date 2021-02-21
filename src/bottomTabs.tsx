import React from 'react'
import color from 'color'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { useTheme } from 'react-native-paper'
import { RouteProp } from '@react-navigation/native'

import overlay from './overlay'
import HomeScreen from './screens/home-screen'
import TwitterScreen from './screens/twitter-screen'
import TrendingScreen from './screens/trending-screen/trending.screen'

import { StackNavigatorParamlist } from './types'

const Tab = createMaterialBottomTabNavigator()

type Props = {
	route: RouteProp<StackNavigatorParamlist, 'FeedList'>
}

export const BottomTabs = (props: Props) => {
	const theme = useTheme()

	const tabBarColor = theme.dark ? (overlay(6, theme.colors.surface) as string) : theme.colors.surface

	return (
		<React.Fragment>
			<Tab.Navigator
				initialRouteName="Home"
				backBehavior="initialRoute"
				shifting={true}
				activeColor={theme.colors.primary}
				inactiveColor={color(theme.colors.text).alpha(0.6).rgb().string()}
				sceneAnimationEnabled={false}
			>
				<Tab.Screen
					name="News"
					component={HomeScreen}
					options={{
						tabBarIcon: 'newspaper-variant-outline',
						tabBarColor,
					}}
				/>
				<Tab.Screen
					name="Trending"
					component={TrendingScreen}
					options={{
						tabBarIcon: 'trending-up',
						tabBarColor,
					}}
				/>
			</Tab.Navigator>
		</React.Fragment>
	)
}
