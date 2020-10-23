import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import HomeScreen from '../home-screen/home.screen'
import TwitterScreen from '../twitter-screen/twitter.screen'
import TrendingScreen from './../trending-screen/trending.screen'

const Tab = createMaterialBottomTabNavigator()

export const BottomTabScreen = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			tabBarOptions={{
				activeTintColor: '#ff0000',
				inactiveTintColor: 'gray',
				showLabel: false,
			}}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ tabBarIcon: ({ color }) => <FontAwesome name={'home'} size={25} color={color} /> }}
			/>
			<Tab.Screen
				name="Trending"
				component={TrendingScreen}
				options={{ tabBarIcon: ({ color }) => <SimpleLine name={'fire'} size={25} color={color} /> }}
			/>
			<Tab.Screen
				name="Twitter"
				component={TwitterScreen}
				options={{ tabBarIcon: ({ color }) => <FontAwesome name={'twitter'} size={25} color={color} /> }}
			/>
		</Tab.Navigator>
	)
}

// export const BottomTabScreen = createBottomTabNavigator(
// 	{
// 		Home: HomeScreen,
// 		Trending: TrendingScreen,
// 		Twitter: TwitterScreen,
// 	},
// 	{
// 		initialRouteName: 'Home',
// 		defaultNavigationOptions: ({ navigation }) => ({
// 			tabBarIcon: ({ focused, horizontal, tintColor }) => {
// 				const { routeName } = navigation.state
// 				let iconName
// 				if (routeName === 'Home') {
// 					iconName = 'home'
// 				} else if (routeName === 'Twitter') {
// 					iconName = 'twitter'
// 				} else if (routeName === 'Trending') {
// 					iconName = 'fire'
// 				}
// 				if (routeName === 'Trending') {
// 					return <SimpleLine name={iconName} size={25} color={tintColor} />
// 				} else {
// 					return <FontAwesome name={iconName} size={25} color={tintColor} />
// 				}
// 			},
// 		}),
// 		tabBarOptions: {
// 			activeTintColor: '#ff0000',
// 			inactiveTintColor: 'gray',
// 			showLabel: false,
// 		},
// 	},
// )
