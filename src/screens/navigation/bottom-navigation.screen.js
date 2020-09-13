import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from '../home-screen/home.screen'
import TwitterScreen from '../twitter-screen/twitter.screen'
import TrendingScreen from './../trending-screen/trending.screen'

export const BottomTabScreen = createBottomTabNavigator(
	{
		Home: HomeScreen,
		Trending: TrendingScreen,
		Twitter: TwitterScreen,
	},
	{
		initialRouteName: 'Home',
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state
				let iconName
				if (routeName === 'Home') {
					iconName = 'home'
				} else if (routeName === 'Twitter') {
					iconName = 'twitter'
				} else if (routeName === 'Trending') {
					iconName = 'fire'
				}
				if (routeName === 'Trending') {
					return <SimpleLine name={iconName} size={25} color={tintColor} />
				} else {
					return <FontAwesome name={iconName} size={25} color={tintColor} />
				}
			},
		}),
		tabBarOptions: {
			activeTintColor: '#ff0000',
			inactiveTintColor: 'gray',
			showLabel: false,
		},
	},
)
