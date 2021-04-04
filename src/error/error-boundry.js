import React from 'react'
import crashlytics from '@react-native-firebase/crashlytics'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		if (this.state.hasError) {
			error.message += `.  Caused by ${errorInfo.componentStack}`
			crashlytics().recordError(error)
		}
	}

	render() {
		if (this.state.hasError) {
			return <></>
		}

		return this.props.children
	}
}

export default ErrorBoundary
