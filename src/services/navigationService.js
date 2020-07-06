import React from 'react'
import { NavigationActions } from 'react-navigation'

let _navigator

function setTopLevelNavigator(navigatorRef, routeName, params) {
	_navigator = navigatorRef
	if (routeName) {
		navigate(routeName, params)
	}
}

function navigate(routeName, params) {
	_navigator.dispatch(
		NavigationActions.navigate({
			routeName,
			params,
		}),
	)
}

// add other navigation functions that you need and export them
const isReadyRef = React.createRef()

export default {
	navigate,
	setTopLevelNavigator,
	isReadyRef,
}
