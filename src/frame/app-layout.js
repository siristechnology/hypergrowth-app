import React from 'react'
import { View } from 'react-native'
import { OfflineNotice } from '../components'

const AppLayout = ({ children }) => (
	<View>
		<OfflineNotice />
		{children}
	</View>
)

export default AppLayout
