import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import { ArticleWebviewComponent, SplashScreenComponent } from '../components'
import { BottomTabScreen } from '../screens/navigation/bottom-navigation.screen'
import ArticleDetailScreen from '../layout/article/article-detail/article-detail.container'

const AppNavigator = createStackNavigator(
	{
		Splash: {
			screen: SplashScreenComponent,
			navigationOptions: {
				header: {
					visible: false,
				},
			},
		},
		Tab: { screen: BottomTabScreen },
		Article: { screen: ArticleWebviewComponent },
		ArticleDetail: { screen: ArticleDetailScreen },
	},
	{
		headerMode: 'none',
		initialRouteName: 'ArticleDetail',
	},
)

export default createAppContainer(AppNavigator)
