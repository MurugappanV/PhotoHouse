import React from "react";
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Button, AlertComp } from "../../components";
import { ScalePerctFullWidth, Colors } from "../../asset";
import { Header } from "../header";

type Props = {
	navigation: any,
	onLogout: Function,
	OrderNumber: string,
	orderId: string,
	name: string,
	vehilceNo: string,
	phoneNo: string,
	onDelivered: Function,
	onCall: Function,
	loading: boolean,
	details: any,
	alertMsg: string,
	OrderDate: string,
	OrdDate: string,
	alertDigMsg: string,
	onAlertConfirm: Function,
	onAlertCancel: Function,
};

const renderTitle = (date: string, orderNo: string) => {
	return (
		<View style={styles.titleContainer}>
			<Text style={styles.dateText}>{date}</Text>
			<View style={styles.orderIdContainer}>
				<Text style={styles.orderIdSmallText}>{"Order No"}</Text>
				<Text style={styles.orderIdText}>{orderNo}</Text>
			</View>
		</View>
	);
};

const renderTotal = (text: string, amount: string) => {
	return (
		<View style={styles.totalContainer}>
			<Text style={styles.totalText}>{text}</Text>
			<Text style={styles.totalAmountText}>{amount}</Text>
		</View>
	);
};

const renderItemPrice = (title: string, amount: string) => {
	return (
		<View style={styles.itemContainer}>
			<Text style={styles.itemTitleText}>{title}</Text>
			<Text style={styles.itemAmountText}>{amount}</Text>
		</View>
	);
};

const renderOrderSummary = (loading: boolean, details: any) => {
	return (
		<ScrollView style={styles.orderSummaryContainer}>
			<Text style={styles.orderSummaryText}>{"Order Summary"}</Text>
			{loading && <ActivityIndicator size="small" color={Colors.bodySecondaryDark} />}
			{!loading && !!details && (
				<View>
					<FlatList
						data={details.Items}
						renderItem={({ item }) =>
							renderItemPrice(item.Title, item.Amount.toFixed(2))
						}
						keyExtractor={(item, index) => `${index} ${item.ID}`}
						style={styles.listcontainer}
					/>
					{renderTotal(
						"Item Total",
						`${details.CurrencySymbol} ${details.SubTotal.toFixed(2)}`,
					)}
					<FlatList
						data={details.ExtraCharges}
						renderItem={({ item }) =>
							renderItemPrice(item.ChargeTitle, item.Amount.toFixed(2))
						}
						keyExtractor={(item, index) => `${index} ${item.ChargeTitle}`}
						style={styles.listcontainer}
					/>
					{renderTotal(
						"Total",
						`${details.CurrencySymbol} ${details.TotalAmount.toFixed(2)}`,
					)}
				</View>
			)}
		</ScrollView>
	);
};

const renderKeyValue = (key: string, value: string) => {
	return (
		<View style={styles.keyValContainer}>
			<Text style={styles.keyText}>{key}</Text>
			<Text style={styles.valText}>{value}</Text>
		</View>
	);
};

const renderOrderItem = (name, vehilceNo, phoneNo, orderId, onCall, onDelivered) => {
	let vehicleNo = vehilceNo;
	if (!vehilceNo || isNaN(vehilceNo)) {
		vehicleNo = "Other transport mode";
	}
	return (
		<View style={styles.container}>
			<View style={styles.infoContainer}>
				{renderKeyValue("Customer Name", name)}
				{renderKeyValue("Vehicle No.", vehicleNo)}
			</View>
			<View style={styles.buttonContainer}>
				<Button
					style={styles.button}
					title="CALL"
					onPress={() => onCall(phoneNo)}
					buttonTheme="Light"
				/>
				<Button
					style={styles.button}
					title="DELIVERED"
					onPress={() => onDelivered(orderId)}
				/>
			</View>
		</View>
	);
};

export default function OrderDetUI(props: Props) {
	const {
		navigation,
		onLogout,
		name,
		OrderNumber,
		vehilceNo,
		phoneNo,
		orderId,
		onCall,
		onDelivered,
		loading,
		details,
		alertMsg,
		onAlertConfirm,
		onAlertCancel,
		OrderDate,
		OrdDate,
		alertDigMsg,
	} = props;
	return (
		<View style={styles.mainContainer}>
			<Header
				title="Order confirmation"
				onLogout={onLogout}
				isLogoutEnable
				onBack={() => navigation.goBack()}
			/>
			<AlertComp
				alertMsg={alertMsg}
				isVisible={!!alertMsg}
				okBtnText="CONFIRM"
				onOk={onAlertConfirm}
				onCancel={onAlertCancel}
				cancelBtnText="CANCEL"
			/>
			<AlertComp
				alertMsg={alertDigMsg}
				isVisible={!!alertDigMsg}
				okBtnText="OK"
				onOk={onAlertCancel}
				onCancel={onAlertCancel}
				cancelBtnText={null}
			/>

			{/* <Text>order detail Container</Text> */}
			{/* <Button title={"Login"} onPress={() => navigation.navigate("Home")} /> */}
			{renderTitle(getDateTimeString(OrderDate, OrdDate), OrderNumber)}
			{renderOrderSummary(loading, details)}
			{renderOrderItem(name, vehilceNo, phoneNo, orderId, onCall, onDelivered)}
		</View>
	);
}

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

const getDateTimeString = (OrderDate: string, OrdDate: string) => {
	const date = new Date(Number(OrderDate));
	console.log("date", date);
	const day = weekday[date.getDay()];
	let period = "AM";
	let hour = date.getUTCHours();
	if (hour > 12) {
		period = "PM";
		hour -= 12;
	}
	const min = date.getUTCMinutes();
	const minHash = min < 10 ? "0" : "";
	return `${day} ${hour}:${minHash}${min}${period}`;
};

OrderDetUI.defaultProps = {};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
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
		margin: ScalePerctFullWidth(3),
		elevation: 10,
	},
	infoContainer: {
		flexDirection: "column",
		padding: ScalePerctFullWidth(5),
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
	orderSummaryContainer: {
		flex: 1,
	},
	titleContainer: {
		backgroundColor: Colors.bgSecondaryLight,
		padding: ScalePerctFullWidth(5),
	},
	dateText: {
		color: Colors.bodySecondaryLight,
		fontSize: 17,
	},
	orderIdContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: ScalePerctFullWidth(1),
	},
	orderIdSmallText: {
		color: Colors.bodyPrimaryDark,
		alignSelf: "flex-start",
		fontSize: 13,
		paddingTop: 2,
	},
	orderIdText: {
		color: Colors.bodyPrimaryDark,
		alignSelf: "flex-start",
		fontSize: 17,
		paddingLeft: 10,
	},
	orderSummaryText: {
		fontWeight: "500",
		color: Colors.bodyPrimaryDark,
		padding: ScalePerctFullWidth(5),
	},
	listcontainer: { backgroundColor: Colors.bgPrimaryLight },
	itemContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
		paddingBottom: ScalePerctFullWidth(5),
		paddingHorizontal: ScalePerctFullWidth(5),
	},
	itemTitleText: {
		textAlign: "left",
		color: Colors.bodyPrimaryDark,
		flex: 8,
	},
	itemAmountText: {
		textAlign: "right",
		color: Colors.bodyPrimaryDark,
		paddingLeft: 10,
		flex: 2,
	},
	totalContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "stretch",
		paddingVertical: ScalePerctFullWidth(2),
		marginBottom: ScalePerctFullWidth(3),
		paddingHorizontal: ScalePerctFullWidth(2),
		marginHorizontal: ScalePerctFullWidth(3),
		borderTopWidth: 0.5,
		borderBottomWidth: 0.5,
		borderColor: Colors.bgSecondaryDark,
	},
	totalText: {
		textAlign: "left",
		color: Colors.bodyPrimaryVarient,
		flex: 8,
	},
	totalAmountText: {
		textAlign: "right",
		color: Colors.bodyPrimaryVarient,
		paddingLeft: 10,
		flex: 2,
	},
});
