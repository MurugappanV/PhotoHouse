/**
 * Place Map
 * Author : Murugappan V
 * Date   : 10 Nov 2018
 * @flow
 */
import React, { PureComponent } from "react";
import { Modal, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { StatusBarComp, MediumText, MapViewComp, CardViewComp } from "../../components";
import {
	Images,
	Colors,
	Metrics,
	ScalePerctFullWidth,
	ScalePerctFullHeight,
	ScaleSampDesgHeight,
	ScaleSampDesgWidth,
	ScaleMinSampleDesg,
	DefaultValues,
} from "../../asset";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { NearByPlaceApi } from "../../service";

type Props = {};
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
		};
	}

	componentDidMount = () => {
		console.log("position 0", this.state.userLatitude + " " + this.state.userLongitude);
		this.fetchPlaces();
		navigator.geolocation.getCurrentPosition(
			position => {
				console.log("position 1", position);
				if (position.coords.latitude) {
					this.setState({ userLatitude: position.coords.latitude, userLongitude: position.coords.longitude });
					this.fetchPlaces();
				}
			},
			error => console.log("position", error.message),
			{ enableHighAccuracy: true },
		);
		this.watchID = navigator.geolocation.watchPosition(position => {
			console.log("position 2", position);
			if (position.coords.latitude) {
				this.setState({ userLatitude: position.coords.latitude, userLongitude: position.coords.longitude });
				this.fetchPlaces();
			}
		});
	};

	fetchPlaces = () => {
		if (this.state.filter == DefaultValues.All) {
			this.fetchNearByPlaces(DefaultValues.ATM);
			this.fetchNearByPlaces(DefaultValues.BANK);
		} else if (this.state.filter == DefaultValues.ATM) {
			this.fetchNearByPlaces(DefaultValues.ATM);
			this.setState({ banks: [] });
		} else if (this.state.filter == DefaultValues.BANK) {
			this.fetchNearByPlaces(DefaultValues.BANK);
			this.setState({ atms: [] });
		}
	};

	fetchNearByPlaces = type => {
		const { userLatitude, userLongitude, searchKey } = this.state;
		NearByPlaceApi(userLatitude, userLongitude, type, searchKey, this.onDataFetched, this.onDataFetchFailed);
	};

	onDataFetched = (type, response) => {
		console.log("data resp ", type);
		if (type == DefaultValues.BANK) {
			this.setState({ banks: response });
		} else {
			this.setState({ atms: response });
		}
	};

	onDataFetchFailed = (type, response) => {
		if (type == DefaultValues.BANK) {
			this.setState({ banks: [] });
		} else {
			this.setState({ atms: [] });
		}
	};

	componentWillUnmount = () => {
		navigator.geolocation.clearWatch(this.watchID);
	};

	getMarkers = (userLatitude, userLongitude, banks, atms) => {
		let markers = [];
		banks.forEach(bank =>
			markers.push({
				latlng: { latitude: bank.geometry.location.lat, longitude: bank.geometry.location.lng },
				type: DefaultValues.BANK,
				id: bank.place_id,
			}),
		);
		atms.forEach(atm =>
			markers.push({
				latlng: { latitude: atm.geometry.location.lat, longitude: atm.geometry.location.lng },
				type: DefaultValues.ATM,
				id: atm.place_id,
			}),
		);
		console.log("markers ", markers);
		return markers;
	};

	getCards = (banks, atms) => {
		let cards = [];
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
		if (this.state.searchKey != text) {
			this.setState({ searchKey: text }, this.fetchPlaces());
		}
	};

	renderSearchBar = () => {
		return (
			<View style={styles.searchBar}>
				<Image style={styles.searchImg} source={Images.searchImg} resizeMode={"contain"} />
				<TextInput
					style={styles.searchInput}
					onChangeText={text => this.onChangeSearchText(text)}
					underlineColorAndroid="transparent"
					selectionColor="black"
					returnKeyType={"search"}
					placeholder={"Search for ATM/Bank"}
					textContentType={"text"}
					secureTextEntry={false}
					placeholderTextColor={Colors.bodySecondaryLight}
					value={this.state.searchKey}
					onSubmitEditing={() => {}}
					autoFocus={false}
				/>
				<View style={styles.seperatorLine} />
				<TouchableOpacity onPress={() => this.setState({ showFilter: true })} style={styles.filterBtn}>
					<Image style={styles.filterImg} source={Images.filterImg} resizeMode={"contain"} />
				</TouchableOpacity>
			</View>
		);
	};

	onFilterChange = (selectedFilter: string) => {
		if (this.state.filter != selectedFilter) {
			this.setState({ filter: selectedFilter, showFilter: false }, this.fetchPlaces());
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
			type: type,
			name: name,
		});
	};

	renderPicker = () => {
		return (
			<Modal
				animationType="fade"
				transparent={true}
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
		const { userLatitude, userLongitude, banks, atms } = this.state;
		return (
			<View style={styles.container}>
				<StatusBarComp />
				<MapViewComp
					region={{
						latitude: userLatitude,
						longitude: userLongitude,
						latitudeDelta: 0.01,
						longitudeDelta: 0.005,
					}}
					markers={this.getMarkers(userLatitude, userLongitude, banks, atms)}
				/>
				{this.renderPicker()}
				{this.renderSearchBar()}
				<View style={{ flex: 100 }} />
				{(banks.length > 0 || atms.length > 0) && (
					<CardViewComp onPress={this.onCardSelect} entries={this.getCards(banks, atms)} />
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
