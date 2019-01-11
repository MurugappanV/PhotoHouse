import React from "react";
import { Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, ScalePerctFullHeight } from "../../asset";

type Props = {
	onPress: Function,
	style?: number | Object | Array<number>,
	textStyle?: number | Object | Array<number>,
	buttonTheme?: string,
	title: string,
	loading?: boolean,
};

function Button(props: Props) {
	const { title, onPress, style, textStyle, buttonTheme, loading } = props;
	return (
		<TouchableOpacity
			onPress={onPress}
			style={StyleSheet.flatten([
				styles.container,
				style,
				buttonTheme === "Dark" ? styles.bgDark : styles.bgLight,
			])}
		>
			{!loading && (
				<Text
					style={StyleSheet.flatten([
						styles.text,
						textStyle,
						buttonTheme === "Dark" ? styles.textLight : styles.textDark,
					])}
				>
					{title}
				</Text>
			)}
			{loading && (
				<ActivityIndicator
					size="small"
					color={
						buttonTheme === "Dark" ? Colors.bodyPrimaryLight : Colors.bodySecondaryDark
					}
				/>
			)}
		</TouchableOpacity>
	);
}

Button.defaultProps = {
	style: undefined,
	textStyle: undefined,
	buttonTheme: "Dark",
	loading: false,
};

export default Button;

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		height: ScalePerctFullHeight(8),
		elevation: 4,
	},
	text: {
		fontWeight: "bold",
	},
	bgDark: {
		backgroundColor: Colors.bgPrimaryDark,
	},
	textDark: {
		color: Colors.bodySecondaryDark,
	},
	bgLight: {
		backgroundColor: Colors.bgSecondaryLight,
	},
	textLight: {
		color: Colors.bodyPrimaryLight,
	},
});
