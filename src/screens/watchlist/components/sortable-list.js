import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, View, FlatList, TouchableNativeFeedback, RefreshControl } from 'react-native'
import { Text } from '@ui-kitten/components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'
import { gql, useMutation } from '@apollo/client'
import ColumnMappings from './column-mappings'

const SortableList = ({ data, onRefresh, refreshing }) => {
	const [direction, setDirection] = useState(null)
	const [selectedColumn, setSelectedColumn] = useState(null)
	const [listData, setListData] = useState(data)
	const [removeStock] = useMutation(REMOVE_STOCK_MUTATION)

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
			<View style={[styles.columnHeader, styles.columnHeaderTxt]} />
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

	const renderItem = ({ item, index }) => {
		return (
			<View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white', height: 50 }}>
				<Text style={{ ...styles.columnRowContent, fontWeight: 'bold' }}>{item.symbol}</Text>
				<Text style={styles.columnRowContent}>{item.price?.toFixed(2)}</Text>
				<Text style={styles.columnRowContent}>{item.changePercent?.toFixed(2)}</Text>
				<Text style={styles.columnRowContent}>{(item.marketCap / 1000).toFixed(2)}</Text>
				<Text style={styles.columnRowContent}>{item.peRatio?.toFixed(2)}</Text>
				<Text style={styles.columnRowContent}>{item.week52High?.toFixed(2)}</Text>
				<Text style={styles.columnRowContent}>{item.week52Low?.toFixed(2)}</Text>
				<Text style={styles.columnRowContent}>{item.ytdChangePercent?.toFixed(2)}</Text>
				<View style={styles.columnRowContent}>
					<TouchableNativeFeedback onPress={() => deleteItem(item)}>
						<MaterialCommunityIcons name="trash-can-outline" size={20} color="gray" />
					</TouchableNativeFeedback>
				</View>
			</View>
		)
	}

	return (
		<ScrollView
			style={styles.container}
			horizontal={true}
			decelerationRate={0}
			snapToInterval={200}
			snapToAlignment={'center'}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0000ff', '#689F38']} />}
		>
			<FlatList
				data={listData}
				keyExtractor={(item) => item.symbol}
				ListHeaderComponent={tableHeader}
				stickyHeaderIndices={[0]}
				renderItem={renderItem}
			/>
		</ScrollView>
	)
}

const DeleteIcon = (props) => <MaterialCommunityIcons name="trash-can-outline" size={20} color="white" />

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
		flexDirection: 'row',
		backgroundColor: '#fff',
		height: '100%',
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	columnHeaderTxt: {
		color: 'white',
		fontWeight: 'bold',
		width: 80,
		textAlign: 'center',
	},
	columnRowContent: {
		width: 80,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
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
		backgroundColor: '#ffebcd',
		justifyContent: 'flex-start',
	},
	underlayLeft: {
		flex: 1,
		backgroundColor: '#ffebcd',
		justifyContent: 'flex-end',
	},
})

export default SortableList
