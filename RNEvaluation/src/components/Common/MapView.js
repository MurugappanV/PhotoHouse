/**
 * @flow
 */
import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Images, DefaultValues, ScaleSampDesgWidth } from "../../asset";

type Props = {
	markers: Array<Object>,
	setCardIndex: Function,
	selectedIndex: number,
	region: any,
};

type State = {};

export class MapViewComp extends PureComponent<Props, State> {
	renderMarkers = (markers: Array<Object>, setCardIndex, selectedIndex) => {
		return markers.map((marker, index) => {
			let image = Images.mapUserImg;
			if (marker.type === DefaultValues.ATM) {
				image = Images.mapAtmImg;
			}
			if (marker.type === DefaultValues.BANK) {
				image = Images.mapBankImg;
			}
			return (
				<Marker
					onPress={() => {
						setCardIndex(index);
					}}
					key={marker.id}
					coordinate={marker.latlng}
				>
					<Image
						style={
							index !== selectedIndex ? styles.markerImg : styles.selectedMarkerImg
						}
						source={image}
						resizeMode="contain"
					/>
				</Marker>
			);
		});
	};

	render() {
		const { setCardIndex, region, markers, selectedIndex } = this.props;
		return (
			<MapView
				provider={PROVIDER_GOOGLE}
				style={styles.map}
				region={region}
				showsUserLocation
				followsUserLocation
				showsMyLocationButton={false}
				showsCompass={false}
				showsPointsOfInterest={false}
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
