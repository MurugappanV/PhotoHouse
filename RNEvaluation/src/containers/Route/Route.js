/**
 * @flow
 */
import React, { PureComponent } from "react";
import { FlatList, View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { StatusBarComp, MediumText, LoadingIndicatorComp } from "../../components";
import {
	Images,
	Colors,
	ScalePerctFullHeight,
	ScaleSampDesgHeight,
	ScaleSampDesgWidth,
	ScaleMinSampleDesg,
	DefaultValues,
} from "../../asset";
import { PlaceRouteApi } from "../../service";

type Props = { navigation: any };
type State = {
	placeId: string,
	userLatitude: number,
	userLongitude: number,
	routes: any,
	loading: boolean,
	type: string,
	name: String,
};

export class Route extends PureComponent<Props, State> {
	constructor(props) {
		super(props);
		const placeId = props.navigation.getParam("placeId", null);
		const userLat = props.navigation.getParam("userLat", null);
		const userLng = props.navigation.getParam("userLng", null);
		const type = props.navigation.getParam("type", null);
		const name = props.navigation.getParam("name", null);
		this.state = {
			placeId,
			userLatitude: userLat,
			userLongitude: userLng,
			routes: null,
			loading: false,
			type,
			name,
		};
	}

	componentDidMount = () => {
		this.fetchRoute();
	};

	componentWillUnmount = () => {};

	fetchRoute = () => {
		this.setState({ loading: true });
		const { userLatitude, userLongitude, placeId } = this.state;
		PlaceRouteApi(
			userLatitude,
			userLongitude,
			placeId,
			this.onDataFetched,
			this.onDataFetchFailed,
		);
	};

	onDataFetched = (response: any) => {
		this.setState({ routes: response, loading: false });
	};

	onDataFetchFailed = () => {
		this.setState({ routes: null, loading: false });
	};

	getListRoutes = (routes: any) => {
		let listRoute = [];
		try {
			if (routes && routes.steps && routes.steps.length > 0) {
				listRoute = routes.steps.map((step: any) => {
					const inst = step.html_instructions;
					let image = Images.upImg;
					if (inst.toLowerCase().includes("left")) {
						image = Images.leftImg;
					}
					if (inst.toLowerCase().includes("right")) {
						image = Images.rightImg;
					}
					return {
						image,
						title: this.getDataFromHtml(inst),
						distance: step.distance.text,
					};
				});
			}
		} catch (error) {
			console.log(error);
		}
		return listRoute;
	};

	getHeader = (routes: any) => {
		return {
			time: routes ? routes.duration.text : "",
			distance: routes ? routes.distance.text : "",
		};
	};

	getFooter = (routes: any, type: string, name: string) => {
		return {
			image: type === DefaultValues.ATM ? Images.atmImg : Images.bankImg,
			title: name,
			address: routes ? routes.end_address : "",
		};
	};

	getDataFromHtml = (data: string) => {
		try {
			let text = data ? data.split("<b>").join("") : "";
			text = text.split("</b>").join("");
			text = text.split("</div>").join("");
			text = text.split("&nbsp;").join("");
			while (text.indexOf("<div", 0) !== -1) {
				const index = text.indexOf("<div", 0);
				const endIndex = text.indexOf(">", index);
				text = text.replace(text.substring(index, endIndex + 1), ", ");
			}
			return text;
		} catch (error) {
			console.log("error", error);
		}
		return "";
	};

	renderHeader = (headerData, navigation) => {
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					style={styles.backContainer}
				>
					<Image
						overlayColor={Colors.bodyPrimaryLight}
						style={styles.backImg}
						source={Images.backImg}
						resizeMode="contain"
					/>
				</TouchableOpacity>
				<View style={styles.headerTextContainer}>
					<Text style={styles.headerTimeText} numberOfLines={1}>
						{headerData.time}
					</Text>
					<Text style={styles.headerDistanceText} numberOfLines={1}>
						{headerData.distance}
					</Text>
				</View>
			</View>
		);
	};

	renderListItem = (item: any) => {
		return (
			<View style={styles.listItemContainer}>
				<View style={styles.itemImgContainer}>
					<Image style={styles.itemImg} source={item.image} resizeMode="contain" />
				</View>
				<View style={styles.itemViewContainer}>
					<Text style={styles.itemTitleText}>{item.title}</Text>
					<Text style={styles.itemDistanceText}>{item.distance}</Text>
				</View>
			</View>
		);
	};

	renderSeperator = () => {
		return <View style={styles.listSeperator} />;
	};

	renderList = (listData: Array, loading: boolean) => {
		return (
			<FlatList
				style={styles.listcontainer}
				renderItem={({ item }) => this.renderListItem(item)}
				ItemSeparatorComponent={this.renderSeperator}
				ListEmptyComponent={() => this.renderEmpty(loading)}
				ListFooterComponent={() => this.renderListFooter(loading)}
				data={listData}
				keyExtractor={(item, index) => index.toString()}
			/>
		);
	};

	renderListFooter = (loading: boolean) => {
		if (loading) {
			return <LoadingIndicatorComp style={styles.footer} />;
		}
		return null;
	};

	renderEmpty = (loading: boolean) => {
		if (!loading) {
			return (
				<View style={styles.empty}>
					<MediumText style={styles.textNoDocument} text="No documents found" />
				</View>
			);
		}
		return null;
	};

	renderFooter = (footerData: any) => {
		return (
			<View style={styles.footerContainer}>
				<Image style={styles.footerImg} source={footerData.image} resizeMode="contain" />
				<View style={styles.footerViewContainer}>
					<Text style={styles.footerTitleText} numberOfLines={1}>
						{footerData.title}
					</Text>
					<Text style={styles.footerAddressText} numberOfLines={2}>
						{footerData.address}
					</Text>
				</View>
			</View>
		);
	};

	render() {
		const { routes, type, name, loading } = this.state;
		const { navigation } = this.props;
		this.getListRoutes(routes);
		return (
			<View style={styles.container}>
				<StatusBarComp />
				{this.renderHeader(this.getHeader(routes), navigation)}
				{this.renderList(this.getListRoutes(routes), loading)}
				{this.renderFooter(this.getFooter(routes, type, name))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bgPrimaryLight,
		flexDirection: "column",
		alignItems: "stretch",
	},
	headerContainer: {
		// width: ScaleSampDesgWidth(280),
		height: ScaleSampDesgHeight(90),
		backgroundColor: Colors.bgSecondaryDark,
		paddingTop: ScaleSampDesgHeight(20),
		flexDirection: "row",
		alignItems: "center",
	},
	backContainer: {
		alignSelf: "stretch",
		justifyContent: "center",
		alignItems: "center",
		padding: ScaleSampDesgWidth(10),
	},
	backImg: {
		width: ScaleMinSampleDesg(20, 20),
		height: ScaleMinSampleDesg(20, 20),
		overlayColor: Colors.bodyPrimaryLight,
	},
	headerTextContainer: {
		paddingTop: ScaleSampDesgHeight(8),
		flex: 1,
	},
	headerTimeText: {
		fontWeight: "bold",
		fontSize: 20,
		color: Colors.bodyPrimaryLight,
		paddingRight: ScaleSampDesgWidth(8),
	},
	headerDistanceText: {
		fontSize: 16,
		color: Colors.bodyPrimaryLight,
		paddingRight: ScaleSampDesgWidth(8),
	},
	listcontainer: {
		flex: 1,
	},
	listItemContainer: {
		paddingVertical: ScaleSampDesgHeight(20),
		flexDirection: "row",
		alignItems: "center",
	},
	itemImgContainer: {
		width: ScaleSampDesgWidth(60),
		alignSelf: "stretch",
		alignItems: "center",
		paddingTop: 5,
	},
	itemImg: {
		height: ScaleSampDesgHeight(22),
	},
	itemViewContainer: {
		paddingRight: ScaleSampDesgWidth(60),
		alignItems: "flex-start",
	},
	itemTitleText: {
		fontSize: 16,
	},
	itemDistanceText: {
		fontSize: 14,
		color: Colors.bodySecondaryLight,
	},
	listSeperator: {
		width: ScaleSampDesgWidth(340),
		marginHorizontal: ScaleSampDesgWidth(10),
		borderBottomColor: Colors.bodySecondaryLight,
		borderBottomWidth: 0.5,
	},
	footer: {
		alignSelf: "stretch",
		height: ScalePerctFullHeight(15),
	},
	empty: {
		alignSelf: "stretch",
		height: ScalePerctFullHeight(15),
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	textNoDocument: {
		fontStyle: "italic",
		color: Colors.bodySecondaryDark,
	},
	footerContainer: {
		elevation: 10,
		height: ScaleSampDesgHeight(90),
		flexDirection: "row",
		alignItems: "center",
		marginRight: ScaleSampDesgWidth(20),
	},
	footerImg: {
		width: ScaleMinSampleDesg(43, 43),
		height: ScaleMinSampleDesg(43, 43),
		marginLeft: ScaleSampDesgWidth(20),
		marginRight: ScaleSampDesgWidth(20),
	},
	footerViewContainer: {
		paddingTop: ScaleSampDesgHeight(17),
		alignItems: "flex-start",
		justifyContent: "flex-start",
		flexWrap: "wrap",
		flex: 1,
	},
	footerTitleText: {
		fontSize: 17,
		flexWrap: "wrap",
	},
	footerAddressText: {
		fontSize: 14,
		color: Colors.bodySecondaryLight,
		flexWrap: "wrap",
		flex: 1,
	},
});
