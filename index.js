import React from 'react'
import { AppRegistry, YellowBox } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import App from './App.tsx'
import { name as appName } from './app.json'
import GraphqlClient from './src/graphql/graphql-client'

YellowBox.ignoreWarnings([
	'Warning: componentWillMount is deprecated',
	'Warning: componentWillReceiveProps is deprecated',
	'Module RCTImageLoader requires',
])

const ApolloApp = () => (
	<ApolloProvider client={GraphqlClient}>
		<App />
	</ApolloProvider>
)

AppRegistry.registerComponent(appName, () => ApolloApp)
