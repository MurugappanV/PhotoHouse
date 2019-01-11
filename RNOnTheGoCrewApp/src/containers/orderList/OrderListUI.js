import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { AlertComp } from "../../components";
import { Header } from "../header";
import ListItemUI from "./ListItemUI";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";

type Props = {
	onLogout: any,
	onCall: Function,
	onDelivered: Function,
	loading: boolean,
	refreshing: boolean,
	onFetchRefresh: Function,
	orders: any,
	alertMsg: string,
	alertDigMsg: string,
	onAlertConfirm: Function,
	onAlertCancel: Function,
	navigateToDet: Function,
	noRecordText: string,
};

const renderEmpty = (loading: boolean, noRecordText: string) => {
	if (!loading) {
		return (
			<View style={styles.empty}>
				<Text style={styles.textNoDocument}>{noRecordText}</Text>
			</View>
		);
	}
	return null;
};

const renderSeperator = () => {
	return <View style={styles.itemSeperator} />;
};

const renderHeader = () => {
	return <View style={styles.listHeader} />;
};

const renderFooter = (loading: boolean, refreshing: boolean) => {
	return (
		<View style={styles.listFooter}>
			{loading && !refreshing && (
				<ActivityIndicator size="small" color={Colors.bodySecondaryDark} />
			)}
		</View>
	);
};

export default function OrderListUI(props: Props) {
	const {
		onLogout,
		onCall,
		onDelivered,
		loading,
		refreshing,
		onFetchRefresh,
		navigateToDet,
		orders,
		alertMsg,
		onAlertConfirm,
		onAlertCancel,
		noRecordText,
		alertDigMsg,
	} = props;
	return (
		<View style={styles.container}>
			<Header title="All orders" onLogout={onLogout} isLogoutEnable />
			{/* <Button title="List" onPress={() => navigation.navigate("Details")} /> */}
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
			<FlatList
				data={orders}
				renderItem={({ item }) => (
					<ListItemUI
						{...item}
						onCall={onCall}
						onDelivered={onDelivered}
						navigateToDet={navigateToDet}
					/>
				)}
				keyExtractor={(item, index) => item.ID.toString()}
				style={styles.listcontainer}
				ItemSeparatorComponent={renderSeperator}
				ListHeaderComponent={renderHeader}
				ListFooterComponent={() => renderFooter(loading, refreshing)}
				ListEmptyComponent={() => renderEmpty(loading, noRecordText)}
				onRefresh={onFetchRefresh}
				refreshing={refreshing}
			/>
		</View>
	);
}
// extraData={this.state}

OrderListUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listcontainer: {
		backgroundColor: "#f8f8f8",
		flex: 1,
	},
	listHeader: {
		marginTop: ScalePerctFullWidth(5),
	},
	listFooter: {
		marginTop: ScalePerctFullWidth(5),
	},
	itemSeperator: {
		marginTop: ScalePerctFullWidth(5),
	},
	empty: {
		alignSelf: "stretch",
		height: ScalePerctFullHeight(15),
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	textNoDocument: {
		color: Colors.bodySecondaryDark,
	},
});

const dummyData = [
	{
		Channel: "On the Go",
		CurrencySymbol: "₹",
		CustomerName: "Ajay",
		CustomerPhoneNumber: "9845874471",
		FormattedStatus: "Your order is on its way.",
		ID: 14070718,
		IsCurrentOrder: false,
		ItemCount: 1,
		Items: "1 Sausage & Egg McMuffin",
		OrdDate: "1/10/2019 10:20:03 AM",
		OrderDate: "1547115603000",
		OrderNumber: "BTM-DL-10-01-2019-135561",
		Status: "Food on the way",
		StoreName: "BTM Layout",
		TotalAmount: 137,
		VehicleNo: "1234",
	},
	{
		Channel: "On the Go",
		CurrencySymbol: "₹",
		CustomerName: "Ajay",
		CustomerPhoneNumber: "9845874471",
		FormattedStatus: "Your order is on its way.",
		ID: 14070733,
		IsCurrentOrder: false,
		ItemCount: 2,
		Items: "2 Chicken McNuggets Piri Piri ( 20 pc)",
		OrdDate: "1/10/2019 12:21:40 PM",
		OrderDate: "1547122900000",
		OrderNumber: "BTM-DL-10-01-2019-135583",
		Status: "Food on the way",
		StoreName: "BTM Layout",
		TotalAmount: 625,
		VehicleNo: "",
	},
];
