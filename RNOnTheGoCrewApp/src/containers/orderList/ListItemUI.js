import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "../../components";
import { ScalePerctFullWidth, Colors, Images } from "../../asset";

type Props = {
	navigateToDet: Function,
	ID: string,
	OrderNumber: string,
	Status: string,
	CustomerName: string,
	VehicleNo: string,
	CustomerPhoneNumber: string,
	onDelivered: Function,
	onCall: Function,
};

const renderKeyValue = (key: string, value: string) => {
	return (
		<View style={styles.keyValContainer}>
			<Text style={styles.keyText}>{key}</Text>
			<Text style={styles.valText}>{value}</Text>
		</View>
	);
};

export default function ListItemUI(props: Props) {
	const {
		ID,
		OrderNumber,
		Status,
		CustomerName,
		VehicleNo,
		CustomerPhoneNumber,
		onCall,
		onDelivered,
		navigateToDet,
	} = props;
	let vehicleNo = VehicleNo;
	if (!VehicleNo || isNaN(VehicleNo)) {
		vehicleNo = "Other transport mode";
	}
	return (
		<TouchableOpacity style={styles.container} onPress={() => navigateToDet(ID)}>
			<View style={styles.infoContainer}>
				<Text style={styles.orderIdText}>{`Order No. ${OrderNumber}`}</Text>
				<View style={styles.statusContainer}>
					<Text style={styles.statusText}>{`Status - ${Status}`}</Text>
					<Image style={styles.statusImgStyle} source={Images.stautusArrowImg} />
				</View>
				{renderKeyValue("Customer Name", CustomerName)}
				{renderKeyValue("Vehicle No.", vehicleNo)}
				{/* {renderKeyValue()} */}
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					title="CALL"
					onPress={() => onCall(CustomerPhoneNumber)}
					buttonTheme="Light"
				/>
				<Button style={styles.button} title="DELIVERED" onPress={() => onDelivered(ID)} />
			</View>
		</TouchableOpacity>
	);
}

ListItemUI.defaultProps = {};

const styles = StyleSheet.create({
	keyValContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
		marginBottom: ScalePerctFullWidth(1),
	},
	keyText: {
		flex: 4,
		fontWeight: "500",
		color: Colors.bodyPrimaryDark,
	},
	valText: {
		flex: 6,
		color: Colors.bodyPrimaryDark,
		paddingLeft: 5,
	},
	container: {
		flexDirection: "column",
		backgroundColor: Colors.bgPrimaryLight,
		marginHorizontal: ScalePerctFullWidth(3),
		elevation: 10,
	},
	infoContainer: {
		flexDirection: "column",
		padding: ScalePerctFullWidth(5),
	},
	orderIdText: {
		fontSize: 15,
		fontWeight: "500",
		color: Colors.bodyPrimaryDark,
		marginBottom: ScalePerctFullWidth(1),
	},
	statusText: {
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderTopWidth: 1,
		borderTopLeftRadius: 3,
		borderBottomLeftRadius: 3,
		borderColor: Colors.bgSecondaryVarient,
		paddingHorizontal: ScalePerctFullWidth(3),
		marginBottom: ScalePerctFullWidth(3),
		alignSelf: "flex-start",
		textAlignVertical: "center",
		textAlign: "center",
		height: 24,
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
	statusContainer: {
		flexDirection: "row",
		alignItems: "stretch",
	},
	statusImgStyle: {
		resizeMode: "stretch",
		width: 12,
		height: 24,
	},
});
