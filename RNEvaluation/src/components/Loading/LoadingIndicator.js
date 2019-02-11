/**
 * @flow
 */

import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { Colors } from "../../asset";

type Props = {
	style?: number | Object | Array<number>,
};

const renderLoading = () => {
	return <ActivityIndicator size="small" color={Colors.bodySecondaryDark} />;
};

export function LoadingIndicator(props: Props) {
	return (
		<View style={StyleSheet.flatten([styles.container, props.style])}>{renderLoading()}</View>
	);
}

LoadingIndicator.defaultProps = {
	style: undefined,
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
	},
});
