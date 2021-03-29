import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from 'lodash'

const SortableList = ({ data, onRefresh, refreshing }) => {
	const columns = ['Symbol', 'Price', 'Change']
	const [direction, setDirection] = useState(null)
	const [selectedColumn, setSelectedColumn] = useState(null)
	const [listData, setListData] = useState(data)

	const sortTable = (column) => {
		const newDirection = direction === 'desc' ? 'asc' : 'desc'
		const sortedData = _.orderBy(listData, [column.toLowerCase()], [newDirection])
		setSelectedColumn(column)
		setDirection(newDirection)
		setListData(sortedData)
	}

	const tableHeader = () => (
		<View style={styles.tableHeader}>
			{columns.map((column, index) => (
				<TouchableOpacity key={index} style={styles.columnHeader} onPress={() => sortTable(column)}>
					<Text style={styles.columnHeaderTxt}>
						{column + ' '}
						{selectedColumn === column && (
							<MaterialCommunityIcons name={direction === 'desc' ? 'arrow-down-drop-circle' : 'arrow-up-drop-circle'} />
						)}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	)

	return (
		<View style={styles.container}>
			<FlatList
				data={listData}
				keyExtractor={(item, index) => item.symbol}
				ListHeaderComponent={tableHeader}
				stickyHeaderIndices={[0]}
				renderItem={({ item, index }) => {
					return (
						<View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white' }}>
							<Text style={{ ...styles.columnRowTxt, fontWeight: 'bold' }}>{item.symbol}</Text>
							<Text style={styles.columnRowTxt}>{item.price}</Text>
							<Text style={styles.columnRowTxt}>{item.change}</Text>
						</View>
					)
				}}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#0000ff', '#689F38']} />}
			/>
		</View>
	)
}

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
})

export default SortableList
