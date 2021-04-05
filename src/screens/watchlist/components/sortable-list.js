import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, TouchableNativeFeedback, RefreshControl } from 'react-native'
import { Button, Text } from '@ui-kitten/components'
import SwipeableItem from 'react-native-swipeable-item'
import Animated from 'react-native-reanimated'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'
import { gql, useMutation } from '@apollo/client'
import ColumnMappings from './column-mappings'

const SortableList = ({ data, onRefresh, refreshing }) => {
	const [direction, setDirection] = useState(null)
	const [selectedColumn, setSelectedColumn] = useState(null)
	const [listData, setListData] = useState(data)
	const [removeStock] = useMutation(REMOVE_STOCK_MUTATION)
	const itemRefs = new Map()

	useEffect(() => {
		setListData(data)
	}, [data])

	const sortTable = (column) => {
		const newDirection = direction === 'desc' ? 'asc' : 'desc'
		const sortedData = _.orderBy(listData, [column], [newDirection])
		setSelectedColumn(column)
		setDirection(newDirection)
		setListData(sortedData)
	}

	const tableHeader = () => (
		<View style={styles.tableHeader}>
			{Object.entries(ColumnMappings).map((col) => (
				<TouchableNativeFeedback key={col[0]} style={styles.columnHeader} onPress={() => sortTable(col[0])}>
					<Text style={styles.columnHeaderTxt}>
						{col[1] + ' '}
						{selectedColumn === col[0] && (
							<MaterialCommunityIcons name={direction === 'desc' ? 'arrow-down-drop-circle' : 'arrow-up-drop-circle'} />
						)}
					</Text>
				</TouchableNativeFeedback>
			))}
		</View>
	)

	const deleteItem = async (item) => {
		try {
			await removeStock({ variables: { symbol: item.symbol } })

			onRefresh()
		} catch (error) {
			console.log('Error while deleting item: ', error)
		}
	}

	const renderUnderlayLeft = ({ item, percentOpen }) => (
		<Animated.View
			style={[styles.row, styles.underlayLeft, { opacity: percentOpen }]} // Fade in on open
		>
			<Button onPress={() => deleteItem(item)} status="danger">
				Remove
			</Button>
		</Animated.View>
	)

	const renderItem = ({ item, index }) => {
		return (
			<SwipeableItem
				key={item.symbol}
				item={item}
				ref={(ref) => {
					if (ref && !itemRefs.get(item.symbol)) {
						itemRefs.set(item.symbol, ref)
					}
				}}
				onChange={({ open }) => {
					if (open) {
						itemRefs.forEach((ref, key) => {
							if (key !== item.symbol && ref) ref.close()
						})
					}
				}}
				overSwipe={20}
				renderUnderlayLeft={renderUnderlayLeft}
				snapPointsLeft={[150]}
			>
				<View style={[styles.row, { backgroundColor: item.backgroundColor, height: item.height }]}>
					<TouchableNativeFeedback>
						<View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white' }}>
							<Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>{item.symbol}</Text>
							<Text style={styles.columnRowTxt}>{item.price?.toFixed(2)}</Text>
							<Text style={styles.columnRowTxt}>{item.changePercent?.toFixed(2)}</Text>
							<Text style={styles.columnRowTxt}>{(item.marketCap / 1000).toFixed(2)}</Text>
							<Text style={styles.columnRowTxt}>{item.peRatio?.toFixed(2)}</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</SwipeableItem>
		)
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={listData}
				keyExtractor={(item) => item.symbol}
				ListHeaderComponent={tableHeader}
				stickyHeaderIndices={[0]}
				renderItem={renderItem}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0000ff', '#689F38']} />}
			/>
		</View>
	)
}

const REMOVE_STOCK_MUTATION = gql`
	mutation removeStock($symbol: String!) {
		removeStockFromWatchList(symbol: $symbol) {
			success
			message
		}
	}
`

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
	},
	tableHeader: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#37C2D0',
		height: 50,
		width: '100%',
	},
	tableRow: {
		flexDirection: 'row',
		height: 40,
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-evenly',
	},
	columnHeader: {
		width: '20%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	columnHeaderTxt: {
		color: 'white',
		fontWeight: 'bold',
	},
	columnRowTxt: {
		width: '20%',
		textAlign: 'center',
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 5,
	},
	text: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 32,
	},
	underlayRight: {
		flex: 1,
		backgroundColor: 'teal',
		justifyContent: 'flex-start',
	},
	underlayLeft: {
		flex: 1,
		backgroundColor: '#ffebcd',
		justifyContent: 'flex-end',
	},
})

export default SortableList
