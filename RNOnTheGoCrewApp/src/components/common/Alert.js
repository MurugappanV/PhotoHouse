import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
import { Button } from "../button";

type Props = {
	alertMsg: string,
	isVisible?: boolean,
	onOk: Function,
	onCancel: Function,
	okBtnText: string,
	cancelBtnText: string,
};

const renderAlert = (
	msg: string,
	okBtnText: String,
	cancelBtnText: string,
	onCancel: Function,
	onOk: Function,
) => {
	return (
		<View style={styles.alertContainer}>
			<View style={styles.msgContainer}>
				<Text style={styles.msgText}>{msg}</Text>
			</View>
			<View style={styles.buttonContainer}>
				{!!cancelBtnText && (
					<Button
						style={styles.button}
						title={cancelBtnText}
						onPress={onCancel}
						buttonTheme="Light"
					/>
				)}
				<Button style={styles.button} title={okBtnText} onPress={onOk} />
			</View>
		</View>
	);
};

function AlertComp(props: Props) {
	// title: string, msg: string
	// Alert.alert(title, msg, [{ text: "OK", onPress: () => {} }], { cancelable: true });
	const { alertMsg, isVisible, onCancel, onOk, okBtnText, cancelBtnText } = props;
	return (
		<Modal animationType="fade" transparent visible={isVisible} onRequestClose={onCancel}>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={onCancel}
					style={{
						top: 0,
						bottom: 0,
						right: 0,
						left: 0,
						backgroundColor: "transparent",
						position: "absolute",
					}}
				/>
				<View style={styles.subContainer}>
					{renderAlert(alertMsg, okBtnText, cancelBtnText, onCancel, onOk)}
				</View>
			</View>
		</Modal>
	);
}

AlertComp.defaultProps = {
	isVisible: false,
};

export default AlertComp;

const styles = StyleSheet.create({
	container: {
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
		backgroundColor: "rgba(255,255,255,0.4)",
		justifyContent: "center",
		alignItems: "center",
	},
	subContainer: {
		width: ScalePerctFullWidth(80),
		height: ScalePerctFullHeight(25),
		backgroundColor: Colors.bgPrimaryLight,
		alignSelf: "center",
		elevation: 15,
	},
	absolute: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
		alignSelf: "stretch",
	},
	button: {
		flex: 1,
		elevation: 0,
	},
	msgContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: ScalePerctFullWidth(10),
	},
	msgText: {
		color: Colors.bodyPrimaryDark,
		textAlign: "center",
	},
	alertContainer: {
		flexDirection: "column",
		flex: 1,
	},
});
