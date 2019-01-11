/**
 * Loading component with large spinner and title
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */

import React from "react";
import { StyleSheet, ActivityIndicator, View, Text, StatusBar } from "react-native";
import { Colors, ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";

type Props = {
	title?: string,
	style?: number | Object | Array<number>,
	textStyle?: number | Object | Array<number>,
};

const renderLoading = () => {
	return <ActivityIndicator size="small" color={Colors.bodyTitleVarient} />;
};

export default function Loading(props: Props) {
	const { style, textStyle, title } = props;
	return (
		<View style={StyleSheet.flatten([styles.container, style])}>
			<StatusBar backgroundColor={Colors.bgPrimaryDark} barStyle="light-content" />
			<Text style={StyleSheet.flatten([styles.text, textStyle])}>{title}</Text>
			{renderLoading()}
		</View>
	);
}

Loading.defaultProps = {
	style: undefined,
	textStyle: undefined,
	title: "Loading",
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		width: ScalePerctFullWidth(70),
		height: ScalePerctFullHeight(15),
	},
	text: {
		paddingBottom: 20,
		fontSize: 17,
		color: Colors.bodyPrimaryLight,
	},
});

//   onPress: Function,
// <TouchableHighlight
// onPress={props.onPress}
// style={StyleSheet.flatten([styles.container, props.style])}
// >
// <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>{props.children}</Text>
// </TouchableHighlight>
