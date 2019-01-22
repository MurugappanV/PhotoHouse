/**
 * Place Route
 * Author : Murugappan V
 * Date   : 10 Nov 2018
 * @flow
 */
import React, { PureComponent } from "react";
import { FlatList, Modal, View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
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
import { PlaceRouteApi } from "../../service";

type Props = {};
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
			placeId: placeId,
			userLatitude: userLat,
			userLongitude: userLng,
			routes: null,
			loading: false,
			type: type,
			name: name,
		};
	}

	componentDidMount = () => {
		fetchRoute();
	};

	componentWillUnmount = () => {};

	fetchRoute = () => {
		this.setState({ routes: response, loading: true });
		const { userLatitude, userLongitude, placeId } = this.state;
		PlaceRouteApi(userLatitude, userLongitude, placeId, this.onDataFetched, this.onDataFetchFailed);
	};

	onDataFetched = (type, response) => {
		this.setState({ routes: response, loading: false });
	};

	onDataFetchFailed = (type, response) => {
		this.setState({ routes: null, loading: false });
	};

	getDisplayRoutes = (routes: any) => {
        if(routes) {
            return routes.steps.map(step => {
                const inst = step.html_instructions;
                return {
                    image: !inst.toLowerCase().includes("turn")
                        ? Images.upImg
                        : inst.toLowerCase().includes("left")
                        ? Images.leftImg
                        : Images.rightImg,
                    title: getDataFromHtml(inst),
                    distance: step.distance.text,
                };
            });
        } 
        return []
	};

	getHeader = (routes: any) => {
		return {
			time: routes.duration.text,
			distance: routes.distance.text,
		};
	};

	getFooter = (routes: any, type: string, name: string) => {
		return {
            image: type == DefaultValues.ATM ? Images.atmImg: Images.atmImg,
            title: name,
			address: routes.end_address,
		};
	};

	getDataFromHtml = (data: string) => {
		let text = data
			.replace("<b>", "")
			.replace("</b>", "")
			.replace("</div>", "");
		while (text.indexOf("<div", 0) != -1) {
			let index = text.indexOf("<div", 0);
			let endIndex = text.indexOf(">", index);
			text.replace(text.substring(index, endIndex + 1), ", ");
		}
    };
    
    renderHeader = (headerData) => {
        return <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.backContainer}>
                <Image
					style={styles.backImg}
					source={Images.backImg}
					resizeMode={"contain"}
				/>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
                <Text  style={styles.headerTimeText}>{headerData.time}</Text>
                <Text style={styles.headerDistanceText}>{headerData.distance}</Text>
            </View>
        </View>
    }

    renderListItem = (item) => {
        return <View style={styles.listItemContainer}>
            <View style={styles.itemImgContainer}>
                <Image style={styles.itemImg} source={item.image} resizeMode={"contain"} />
            </View>
            <View style={styles.itemViewContainer}>
                <Text style={styles.itemTitleText}>{item.title}</Text>
                <Text style={styles.itemDistanceText}>{item.distance}</Text>
            </View>
        </View>
    }

    renderSeperator = () => {
        return <View style={styles.listSeperator}/>
    }

    renderList = (listData) => {
        return <FlatList
            style={styles.listcontainer}
            renderItem={({item, index}) => this.renderItem(item)}
            ItemSeparatorComponent={this.renderSeperator}
            ListEmptyComponent={() => this.renderEmpty(this.state.loading)}
            ListFooterComponent={() => this.renderListFooter(this.state.loading)}
            data={listData}
            keyExtractor={(item, index) => index}
        />
    }

    renderListFooter = (loading) => {
        if(loading) {
            return <LoadingIndicatorComp style={styles.footer}/>
        }
        return null
    }

    renderEmpty = (loading) => {
        if(!loading ) {
            return <View style={styles.empty}>
                <MediumText style={styles.textNoDocument} text={'No documents found'}/>
            </View>
        }
        return null
    }

    renderFooter = (footerData) => {
        return <View style={styles.footerContainer}>
            <Image style={styles.footerImg} source={footerData.image} resizeMode={"contain"} />
            <View style={styles.footerViewContainer}>
                <Text style={styles.footerTitleText}>{footerData.title}</Text>
                <Text style={styles.footerAddressText}>{footerData.address}</Text>
            </View>
        </View>
    }
    
    
    
	render() {
		const { routes, type, name } = this.state;
		return (
			<View style={styles.container}>
				<StatusBarComp />
				{!!routes && this.renderHeader(getHeader(routes))}
				{this.renderList(getDisplayRoutes(routes))}
				{!!routes && this.renderFooter(getFooter(routes, type, name))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor: Colors.bgPrimaryLight,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    headerContainer: {
		// width: ScaleSampDesgWidth(280),
		height: ScaleSampDesgHeight(90),
        backgroundColor: Colors.bgSecondaryDark,
        paddingTop: ScaleSampDesgHeight(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    backContainer: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: ScaleSampDesgWidth(10),
        paddingRight: ScaleSampDesgWidth(10),
    },
    backImg: {
		width: ScaleMinSampleDesg(20, 20),
		height: ScaleMinSampleDesg(20, 20),
    },
    headerTextContainer: {
        paddingTop: ScaleSampDesgHeight(12),
        flex: 1,
    },
    headerTimeText: {
        fontWeight: 'bold',
        fontSize: 26,
        color: Colors.bodyPrimaryLight
    },
    headerDistanceText: {
        fontSize: 20,
        color: Colors.bodyPrimaryLight
    },
    listcontainer: {
        flex: 1
    },
    listItemContainer: {
        paddingTop: ScaleSampDesgHeight(20)
    },
    itemImgContainer: {
        width: ScaleSampDesgWidth(60),
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingTop: 5
    },
    itemImg: {
        height: ScaleSampDesgHeight(22)
    },
    itemViewContainer: {
        paddingRight: ScaleSampDesgWidth(60),
        alignItems: 'flex-start'
    },
    itemTitleText: {
        fontSize: 16
    },
    itemDistanceText: {
        fontSize: 14,
        color: Colors.bodySecondaryLight
    },
    listSeperator: {
		width: ScaleSampDesgWidth(360),
		borderBottomColor: Colors.bodySecondaryLight,
		borderBottomWidth: 0.5,
    },
    footer: {
        alignSelf: 'stretch',
        height: ScalePerctFullHeight(15),

    },
    empty: {
        alignSelf: 'stretch',
        height: ScalePerctFullHeight(15),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNoDocument: {
        fontStyle: 'italic',
        color: Colors.bodySecondaryDark
    },
    footerContainer: {
        elevation: 10,
		height: ScaleSampDesgHeight(90),
        flexDirection: 'row',
        alignItems: 'center'
    },
    footerImg: {
		width: ScaleMinSampleDesg(43, 43),
        height: ScaleMinSampleDesg(43, 43),
        marginLeft: ScaleSampDesgWidth(20),
        marginRight: ScaleSampDesgWidth(20)
    },
    footerViewContainer: {
        alignSelf: 'stretch',
		paddingTop: ScaleSampDesgHeight(17),
        alignItems: 'flex-start'
    },
    footerTitleText: {
        fontSize: 17
    },
    footerAddressText: {
        fontSize: 14,
        color: Colors.bodySecondaryLight
    },
});