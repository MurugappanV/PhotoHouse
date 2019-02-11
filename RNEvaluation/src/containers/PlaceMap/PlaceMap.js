/**
 * @flow
 */
import React, { PureComponent } from "react";
import { Modal, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { StatusBarComp, MediumText, MapViewComp, CardViewComp } from "../../components";
import {
	Images,
	Colors,
	Metrics,
	ScaleSampDesgHeight,
	ScaleSampDesgWidth,
	ScaleMinSampleDesg,
	DefaultValues,
} from "../../asset";
import { NearByPlaceApi } from "../../service";

type Props = { navigation: any };
type State = {
	userLatitude: number,
	userLongitude: number,
	searchKey: string,
	banks: Array<Object>,
	atms: Array<Object>,
};
export class PlaceMap extends PureComponent<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			userLatitude: 13.3807157,
			userLongitude: 74.7393395,
			searchKey: "",
			banks: [],
			atms: [],
			filter: DefaultValues.All,
			showFilter: false,
			selectedIndex: 0,
		};
	}

	componentDidMount = () => {
		this.fetchPlaces();
		navigator.geolocation.getCurrentPosition(
			(position: any) => {
				if (position.coords.latitude) {
					this.setState({
						userLatitude: position.coords.latitude,
						userLongitude: position.coords.longitude,
					});
				}
			},
			error => console.log("position", error.message),
			{ enableHighAccuracy: true },
		);
		this.watchID = navigator.geolocation.watchPosition((position: any) => {
			if (position.coords.latitude) {
				this.setState({
					userLatitude: position.coords.latitude,
					userLongitude: position.coords.longitude,
				});
			}
		});
	};

	componentDidUpdate(prevProps, prevState) {
		const { filter, userLatitude, userLongitude } = this.state;
		if (
			filter !== prevState.filter ||
			userLatitude !== prevState.userLatitude ||
			userLongitude !== prevState.userLongitude
		) {
			this.fetchPlaces();
		}
	}

	fetchPlaces = () => {
		if (this.state.filter === DefaultValues.All) {
			this.fetchNearByPlaces(DefaultValues.ATM);
			this.fetchNearByPlaces(DefaultValues.BANK);
		} else if (this.state.filter === DefaultValues.ATM) {
			this.fetchNearByPlaces(DefaultValues.ATM);
			this.setState({ banks: [] });
		} else if (this.state.filter === DefaultValues.BANK) {
			this.fetchNearByPlaces(DefaultValues.BANK);
			this.setState({ atms: [] });
		}
	};

	fetchNearByPlaces = (type: string) => {
		const { userLatitude, userLongitude, searchKey } = this.state;
		NearByPlaceApi(
			userLatitude,
			userLongitude,
			type,
			searchKey,
			this.onDataFetched,
			this.onDataFetchFailed,
		);
	};

	onDataFetched = (type: string, response: any) => {
		if (type === DefaultValues.BANK) {
			this.setState({ banks: response });
		} else {
			this.setState({ atms: response });
		}
	};

	onDataFetchFailed = (type: string) => {
		if (type === DefaultValues.BANK) {
			this.setState({ banks: [] });
		} else {
			this.setState({ atms: [] });
		}
	};

	componentWillUnmount = () => {
		navigator.geolocation.clearWatch(this.watchID);
	};

	getMarkers = (banks, atms) => {
		const markers = [];
		if (banks) {
			banks.forEach(bank =>
				markers.push({
					latlng: {
						latitude: bank.geometry.location.lat,
						longitude: bank.geometry.location.lng,
					},
					type: DefaultValues.BANK,
					id: bank.place_id,
				}),
			);
		}
		if (atms) {
			atms.forEach(atm =>
				markers.push({
					latlng: {
						latitude: atm.geometry.location.lat,
						longitude: atm.geometry.location.lng,
					},
					type: DefaultValues.ATM,
					id: atm.place_id,
				}),
			);
		}
		if (markers.len > 0) {
			this.setCardIndex(0);
		}
		return markers;
	};

	setCardIndex = (index: number) => {
		this.setState({ selectedIndex: index });
	};

	getCards = (banks, atms) => {
		const cards = [];
		banks.forEach(bank =>
			cards.push({
				title: bank.name,
				address: bank.vicinity,
				type: DefaultValues.BANK,
				id: bank.place_id,
			}),
		);
		atms.forEach(atm =>
			cards.push({
				title: atm.name,
				address: atm.vicinity,
				type: DefaultValues.ATM,
				id: atm.place_id,
			}),
		);
		return cards;
	};

	onChangeSearchText = (text: string) => {
		if (this.state.searchKey !== text) {
			this.setState({ searchKey: text });
		}
	};

	renderFilterButton = () => {
		return (
			<TouchableOpacity
				onPress={() => this.setState({ showFilter: true })}
				style={styles.filterBtn}
			>
				<Image style={styles.filterImg} source={Images.filterImg} resizeMode="contain" />
			</TouchableOpacity>
		);
	};

	renderSearchBar = () => {
		return (
			<View style={styles.searchBar}>
				<Image style={styles.searchImg} source={Images.searchImg} resizeMode="contain" />
				<TextInput
					style={styles.searchInput}
					onChangeText={text => this.onChangeSearchText(text)}
					underlineColorAndroid={Colors.bgTransparent}
					selectionColor={Colors.bodyPrimaryDark}
					returnKeyType="search"
					placeholder="Search for ATM/Bank"
					textContentType="sublocality"
					secureTextEntry={false}
					placeholderTextColor={Colors.bodySecondaryLight}
					value={this.state.searchKey}
					onSubmitEditing={() => this.fetchPlaces()}
					autoFocus={false}
				/>
				<View style={styles.seperatorLine} />
				{this.renderFilterButton()}
			</View>
		);
	};

	onFilterChange = (selectedFilter: string) => {
		if (this.state.filter !== selectedFilter) {
			this.setState({ filter: selectedFilter, showFilter: false });
		} else {
			this.setState({ showFilter: false });
		}
	};

	renderPickerItem = (title: string, value: string) => {
		return (
			<TouchableOpacity style={styles.pickerItem} onPress={() => this.onFilterChange(value)}>
				<MediumText style={styles.pickerText} text={title} />
			</TouchableOpacity>
		);
	};

	onCardSelect = (id: string, type: string, name: string) => {
		const { userLatitude, userLongitude } = this.state;
		this.props.navigation.navigate("Route", {
			placeId: id,
			userLat: userLatitude,
			userLng: userLongitude,
			type,
			name,
		});
	};

	renderPicker = () => {
		return (
			<Modal
				animationType="fade"
				transparent
				visible={this.state.showFilter}
				onRequestClose={() => {
					this.setState({ showFilter: false });
				}}
			>
				<View style={styles.filterModal}>
					<View style={styles.pickerStyle}>
						{this.renderPickerItem("Bank", DefaultValues.BANK)}
						<View style={styles.pickerSeperator} />
						{this.renderPickerItem("Atm", DefaultValues.ATM)}
						<View style={styles.pickerSeperator} />
						{this.renderPickerItem("Cancel", DefaultValues.All)}
					</View>
				</View>
			</Modal>
		);
	};

	render() {
		const { userLatitude, userLongitude, banks, atms, selectedIndex } = this.state;
		return (
			<View style={styles.container}>
				<StatusBarComp />
				<MapViewComp
					region={{
						latitude: userLatitude,
						longitude: userLongitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.01,
					}}
					markers={this.getMarkers(banks, atms)}
					setCardIndex={this.setCardIndex}
					selectedIndex={selectedIndex}
				/>
				{this.renderPicker()}
				{this.renderSearchBar()}
				{/* <View style={{ flex: 100 }} /> */}
				{(banks.length > 0 || atms.length > 0) && (
					<View
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
						}}
					>
						<CardViewComp
							onPress={this.onCardSelect}
							entries={this.getCards(banks, atms)}
							setCardIndex={this.setCardIndex}
							selectedIndex={selectedIndex}
						/>
					</View>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bgPrimaryLight,
		...StyleSheet.absoluteFillObject,
	},
	searchBar: {
		width: ScaleSampDesgWidth(330),
		height: ScaleSampDesgHeight(46),
		marginLeft: ScaleSampDesgWidth(15),
		marginRight: ScaleSampDesgWidth(15),
		marginTop: ScaleSampDesgHeight(40),
		backgroundColor: Colors.bgPrimaryLight,
		borderRadius: Metrics.SMOOTH_CORNER,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		elevation: 5,
	},
	searchInput: {
		flex: 1,
		textAlign: "left",
		fontSize: Metrics.MEDIUM_TEXT_SIZE,
	},
	searchImg: {
		width: ScaleMinSampleDesg(16, 16),
		height: ScaleMinSampleDesg(16, 16),
		marginLeft: ScaleSampDesgWidth(11),
		marginRight: ScaleSampDesgWidth(11),
	},
	seperatorLine: {
		height: ScaleSampDesgHeight(30),
		borderRightColor: Colors.bodySecondaryLight,
		borderRightWidth: 1,
	},
	filterImg: {
		width: ScaleMinSampleDesg(18, 18),
		height: ScaleMinSampleDesg(18, 18),
	},
	filterBtn: {
		alignSelf: "stretch",
		justifyContent: "center",
		paddingLeft: ScaleSampDesgWidth(18),
		paddingRight: ScaleSampDesgWidth(18),
	},
	pickerStyle: {
		width: ScaleSampDesgWidth(280),
		height: ScaleSampDesgHeight(182),
		backgroundColor: Colors.bgPrimaryLight,
		borderRadius: Metrics.SMOOTH_CORNER,
	},
	pickerItem: {
		width: ScaleSampDesgWidth(280),
		height: ScaleSampDesgHeight(60),
		borderRadius: Metrics.SMOOTH_CORNER,
		justifyContent: "center",
		alignItems: "center",
	},
	pickerText: {
		color: Colors.bodyPrimaryVarient,
	},
	filterModal: {
		flex: 1,
		borderBottomColor: Colors.bgSemiTransparent,
		justifyContent: "center",
		alignItems: "center",
	},
	pickerSeperator: {
		width: ScaleSampDesgWidth(280),
		borderBottomColor: Colors.bodySecondaryLight,
		borderBottomWidth: 0.5,
	},
});
