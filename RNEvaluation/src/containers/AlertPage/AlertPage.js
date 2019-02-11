/**
 * @flow
 */
import React, { PureComponent } from "react";
import { View, Image, StyleSheet } from "react-native";
import { StatusBarComp, MediumText } from "../../components";
import { Images, Colors, ScalePerctFullWidth } from "../../asset";

type Props = {};
export class AlertPage extends PureComponent<Props> {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBarComp />
				<View style={styles.subContainer}>
					<Image style={styles.image} source={Images.wifiImg} />
					<MediumText style={styles.text} text="No network connection" />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.bgPrimaryLight,
	},
	subContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	text: {
		fontSize: 25,
	},
	image: {
		tintColor: Colors.bodyPrimaryVarient,
		height: ScalePerctFullWidth(40),
		width: ScalePerctFullWidth(40),
	},
});
