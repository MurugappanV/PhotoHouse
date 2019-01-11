import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ListView, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Images } from '../../asset';
import { Line } from '../Common'

function mergeStyles () {
    return Array.prototype.concat.apply([], arguments)
}       

const itemType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ label: PropTypes.any, value: PropTypes.any })
])

const styleType = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.number,
  PropTypes.array
])

const sourceType = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

// A customiseable ListView that allows you to select multiple rows
export class SelectMultiple extends Component {
	static propTypes = {
		items: PropTypes.arrayOf(itemType).isRequired,
		selectedItems: PropTypes.any,

		onSelectionsChange: PropTypes.func.isRequired,
		renderLabel: PropTypes.func,
		listViewProps: PropTypes.any,
		style: styleType,
		rowStyle: styleType,
		checkboxStyle: styleType,
		labelStyle: styleType,

		selectedRowStyle: styleType,
		selectedCheckboxStyle: styleType,
		selectedLabelStyle: styleType
	}

	static defaultProps = {
		selectedItems: [],
		style: {},
		rowStyle: {},
		checkboxStyle: {},
		checkboxCheckedStyle: {},
		labelStyle: {},
		checkboxSource: "",
		selectedCheckboxSource: "",
		renderLabel: null
	}

	constructor (props) {
		super(props)

		const rows = this.getRowData(props)

		const dataSource = new ListView.DataSource({
		rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected
		}).cloneWithRows(rows)

		this.state = { dataSource }
	}

	componentWillReceiveProps (nextProps) {
		const rows = this.getRowData(nextProps)
		const dataSource = this.state.dataSource.cloneWithRows(rows)
		this.setState({ dataSource })
	}

	getRowData ({ items, selectedItems }) {
		items = items.map(this.toLabelValueObject)
		selectedItems = (selectedItems || []).map(this.toLabelValueObject)

		items.forEach((item) => {
		item.selected = selectedItems.some((i) => i.value === item.value)
		})

		return items
	}

	onRowPress (row) {
		const { label, value } = row
		let { selectedItems } = this.props

		selectedItems = (selectedItems || []).map(this.toLabelValueObject)

		const index = selectedItems.findIndex((selectedItem) => selectedItem.value === value)

		if (index > -1) {
		selectedItems = selectedItems.filter((selectedItem) => selectedItem.value !== value)
		} else {
		selectedItems = selectedItems.concat({ label, value })
		}

		this.props.onSelectionsChange(selectedItems, { label, value })
	}

	toLabelValueObject (obj) {
		// console.log("obj type ", Object.prototype.toString.call(obj))
		if (Object.prototype.toString.call(obj) === '[object String]' || Object.prototype.toString.call(obj) === '[object Number]') {
		return { label: obj, value: obj }
		} else {
		return { label: obj.label, value: obj.value }
		}
	}

	render () {
		const { dataSource } = this.state
		const { style, listViewProps } = this.props
		const { renderItemRow } = this
		return <ListView style={style} dataSource={dataSource} renderRow={renderItemRow} {...(listViewProps || {})} />
	}

	renderLabel = (label, style, selected) => {
		if (this.props.renderLabel) {
		return this.props.renderLabel(label, style, selected)
		}
		return (
		<Text style={style}>{label}</Text>
		)
	}

	renderItemRow = (row) => {
		let {
		checkboxSource,
		rowStyle,
		labelStyle,
		checkboxStyle
		} = this.props

		const {
		
		selectedRowStyle,
		selectedCheckboxStyle,
		selectedLabelStyle
		} = this.props

		if (row.selected) {
		checkboxSource = Images.checkSelectImg
		rowStyle = mergeStyles(styles.row, rowStyle, selectedRowStyle)
		checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle, selectedCheckboxStyle)
		labelStyle = mergeStyles(styles.label, labelStyle, selectedLabelStyle)
		} else {
		checkboxSource = Images.checkBoxImg
		rowStyle = mergeStyles(styles.row, rowStyle)
		checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle)
		labelStyle = mergeStyles(styles.label, labelStyle)
		}

		return (
		<TouchableOpacity onPress={() => this.onRowPress(row)}>
			<View style={rowStyle}>
			<Image style={checkboxStyle} source={checkboxSource} />
			{this.renderLabel(row.label, labelStyle, row.selected)}
			</View>
			<Line style={styles.line}/>
		</TouchableOpacity>
		)
	}
}

const styles =  StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff'
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 15
  },
  line: {
	  marginLeft: 55,
	  alignSelf: 'stretch',
	  borderBottomWidth: 0.5
  },
  label: {}
})