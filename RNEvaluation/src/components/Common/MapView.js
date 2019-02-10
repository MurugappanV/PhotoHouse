/**
 * Map view component
 * Author : Murugappan V
 * Date   : 10 Nov 2018
 * @flow
 */
import React, { PureComponent } from "react";
import { StyleSheet, Image, View, TouchableHighlight } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { Images, DefaultValues, ScaleSampDesgWidth } from "../../asset";

type Props = {
	region: any,
	markers: Array<Object>,
};

type State = {
	region: any,
	markers: Array<Object>,
};

export class MapViewComp extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		// this.state = { region: props.region, markers: props.markers };
	}

	// static getDerivedStateFromProps(nextProps: Props, prevState: State) {
	// 	if (nextProps.markers != prevState.markers) {
	// 		return { markers: nextProps.markers };
	// 	}
	// 	return null;
	// }

	onRegionChange = (region: any) => {
		this.setState({ region });
	};

	renderMarkers = (markers: Array<Object>, setCardIndex, selectedIndex) => {
		return markers.map((marker, index) => (
			<Marker
				onPress={() => {
					setCardIndex(index);
				}}
				key={marker.id}
				coordinate={marker.latlng}
			>
				<Image
					style={index !== selectedIndex ? styles.markerImg : styles.selectedMarkerImg}
					source={
						marker.type == DefaultValues.ATM
							? Images.mapAtmImg
							: marker.type == DefaultValues.USER
							? Images.mapUserImg
							: Images.mapBankImg
					}
					resizeMode={"contain"}
				/>
			</Marker>
		));
	};

	render() {
		const { setCardIndex, region, markers, selectedIndex } = this.props;
		return (
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
				showsUserLocation={true}
				followsUserLocation={true}
				showsMyLocationButton={false}
				showsCompass={false}
				showsPointsOfInterest={false}
				// onRegionChange={this.onRegionChange}
			>
				{this.renderMarkers(markers, setCardIndex, selectedIndex)}
			</MapView>
		);
	}
}

const styles = StyleSheet.create({
	map: {
		...StyleSheet.absoluteFillObject,
	},
	markerImg: {
		width: ScaleSampDesgWidth(39),
		height: ScaleSampDesgWidth(39),
		overlayColor: "#00000080",
	},
	selectedMarkerImg: {
		width: ScaleSampDesgWidth(45),
		height: ScaleSampDesgWidth(45),
		overlayColor: "#00000000",
	},
});

// getInitialState() {
// 	return {
// 		region: {
// 			latitude: 37.78825,
// 			longitude: -122.4324,
// 			latitudeDelta: 0.0922,
// 			longitudeDelta: 0.0421,
// 		},
// 	};
// }
