/**
 * @flow
 */
import React, { PureComponent } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import {
	Images,
	Colors,
	Metrics,
	DefaultValues,
	ScaleSampDesgWidth,
	ScaleSampDesgHeight,
} from "../../asset";
import { MediumText, SmallText } from "../Texts";

type Props = {
	entries: Array<Object>,
	onPress: Function,
	selectedIndex: number,
	setCardIndex: Function,
};

type State = {};

export class CardViewComp extends PureComponent<Props, State> {
	componentDidUpdate(prevProps) {
		if (prevProps.selectedIndex !== this.props.selectedIndex) {
			this.carousel.snapToItem(this.props.selectedIndex);
		}
	}

	renderItem = (item: any) => {
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.onPress(item.id, item.type, item.title);
				}}
				style={styles.slide}
			>
				<Image
					style={styles.iconImg}
					source={item.type === DefaultValues.ATM ? Images.atmImg : Images.bankImg}
					resizeMode="contain"
				/>
				<View style={styles.textView}>
					<MediumText
						style={styles.titleText}
						text={item.title}
						textProps={{ numberOfLines: 1 }}
					/>
					<SmallText
						style={styles.addressText}
						text={item.address}
						textProps={{ numberOfLines: 1 }}
					/>
				</View>
				<View style={styles.directionView}>
					<Image
						style={styles.directionImg}
						source={Images.directionImg}
						resizeMode="contain"
					/>
					<SmallText style={styles.dirText} text="Direction" />
				</View>
			</TouchableOpacity>
		);
	};

	render() {
		const { entries, setCardIndex } = this.props;
		return (
			<Carousel
				ref={(c: any) => {
					this.carousel = c;
				}}
				onSnapToItem={(slideIndex: number) => {
					setCardIndex(slideIndex);
				}}
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
				layout="default"
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
