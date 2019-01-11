/**
 * Image Button
 * Author : Murugappan V
 * Date   : 9 Jan 2018
 * @flow
 */

import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

type Props = {
	onPress: Function,
	style?: number | Object | Array<number>,
	imgStyle?: number | Object | Array<number>,
	source: any,
};

export default function ImageBtn(props: Props) {
	const { onPress, style, imgStyle, source } = props;
	return (
		<TouchableOpacity onPress={onPress} style={StyleSheet.flatten([styles.container, style])}>
			<Image style={StyleSheet.flatten([styles.imgStyle, imgStyle])} source={source} />
		</TouchableOpacity>
	);
}

ImageBtn.defaultProps = {
	style: undefined,
	imgStyle: undefined,
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},
	imgStyle: {
		width: 30,
		height: 30,
		resizeMode: "contain",
	},
});
