/**
 * Map view component
 * Author : Murugappan V
 * Date   : 10 Nov 2018
 * @flow
 */
import React, { PureComponent } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Images, Colors, Metrics, DefaultValues, ScaleSampDesgWidth, ScaleSampDesgHeight } from "../../asset";
import { MediumText, SmallText } from "../Texts";
import Carousel from "react-native-snap-carousel";

type Props = {
	entries: Array<Object>,
	onPress: Function,
};

type State = {
	entries: Array<Object>,
};

export class CardViewComp extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		// this.state = { entries: props.entries };
	}

	// static getDerivedStateFromProps(nextProps, prevState) {
	// 	if (nextProps.entries != prevState.entries) {
	// 		return { entries: nextProps.entries };
	// 	}
	// 	return null;
	// }

	renderItem = (item, index ) => {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.onPress(item.id, item.type);
				}}
				style={styles.slide}
			>
				<Image
					style={styles.iconImg}
					source={item.type == DefaultValues.ATM ? Images.atmImg : Images.bankImg}
					resizeMode={"contain"}
				/>
				<View style={styles.textView}>
					<MediumText text={item.title} />
					<SmallText style={styles.addressText} text={item.address} />
				</View>
				<View style={styles.directionView}>
					<Image style={styles.directionImg} source={Images.directionImg} resizeMode={"contain"} />
					<SmallText style={styles.dirText} text={"Direction"} />
				</View>
			</TouchableOpacity>
		);
	};

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.selectedItem != this.props.selectedItem) {
			this._carousel.snapToItem(this.props.selectedItem)
		}
	}

	render() {
		console.log("card view")
		const {entries, setCardIndex} = this.props
		return (
			<Carousel
				ref={c => {
					this._carousel = c;
				}}
				onSnapToItem={slideIndex => {setCardIndex(slideIndex)}}
				contentContainerCustomStyle={{ elevation: 10, height: ScaleSampDesgHeight(84) }}
				firstItem={0}
				inactiveSlideScale={0.8}
				containerCustomStyle={{
					paddingTop: ScaleSampDesgHeight(15),
					height: ScaleSampDesgHeight(114),
					flex: 0,
				}}
				data={entries}
				renderItem={({ item, index }) => this.renderItem(item, index)}
				sliderWidth={ScaleSampDesgWidth(360)}
				itemWidth={ScaleSampDesgWidth(330)}
				layout={"default"}
			/>
		);
	}
}
// sliderWidth={fullWidth}
// itemWidth={fullWidth - 160}
// data={props.familyStatisticData}
// renderItem={this.renderItem}
const styles = StyleSheet.create({
	title: {},
	slide: {
		backgroundColor: Colors.bgPrimaryLight,
		borderRadius: Metrics.SMOOTH_CORNER,
		height: ScaleSampDesgHeight(84),
		flexDirection: "row",
		alignItems: "stretch",
		justifyContent: "space-evenly",
		elevation: 10,
	},
	iconImg: {
		margin: ScaleSampDesgWidth(20),
		width: ScaleSampDesgWidth(43),
		height: ScaleSampDesgWidth(43),
	},
	textView: {
		flex: 1,
		alignContent: "flex-start",
		alignItems: "flex-start",
		paddingTop: ScaleSampDesgWidth(14),
		paddingLeft: ScaleSampDesgWidth(3),
	},
	directionView: {
		padding: ScaleSampDesgWidth(20),
		alignContent: "center",
		alignItems: "center",
	},
	directionImg: {
		width: ScaleSampDesgWidth(30),
		height: ScaleSampDesgWidth(30),
	},
	addressText: {
		color: Colors.bodySecondaryLight,
	},
	dirText: {
		color: Colors.bodyPrimaryVarient,
	},
});
