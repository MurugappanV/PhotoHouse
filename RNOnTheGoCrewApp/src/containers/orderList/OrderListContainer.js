import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Linking, NativeModules } from "react-native";
import { bindActionCreators } from "redux";
import OrderListUI from "./OrderListUI";
import { setUserIdStorage } from "../../storage";
import { Actions } from "../../redux";
import { OrderListApi, OrderDeliveredApi } from "../../service";

type Props = {
	navigation: any,
	orders: any,
	clearOrderListAction: Function,
	clearUserIdAction: Function,
	setOrderListAction: Function,
};

class OrderListContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			loading: false,
			refreshing: false,
			delevering: false,
			alertMsg: null,
			alertDigMsg: null,
			noRecordText: "No orders found",
			onAlertConfirm: () => {},
		};

		NativeModules.Device.getDeviceName((err, name) => console.log(err, name));
	}

	componentDidMount() {
		this.fetchOrders();
	}

	fetchOrders = () => {
		const { clearOrderListAction } = this.props;
		clearOrderListAction();
		this.setState({ loading: true });
		OrderListApi(
			this.onOrderListFetched,
			this.onOrderListFetchFailed,
			this.onOrderListFetchError,
		);
	};

	onOrderListFetched = (list: any) => {
		const { setOrderListAction } = this.props;
		this.setState({ loading: false, refreshing: false, noRecordText: "No orders found" });
		setOrderListAction(list);
	};

	onOrderListFetchFailed = (message: string) => {
		this.setState({ loading: false, refreshing: false, noRecordText: message });
	};

	onOrderListFetchError = (error: any) => {
		this.setState({
			loading: false,
			refreshing: false,
			noRecordText: error.toString().includes("Network Error")
				? "Please check your internet connection"
				: "Some error occured, please try again later",
		});
	};

	onLogout = () => {
		this.setState({
			alertMsg: "Are you sure you want to logout?",
			onAlertConfirm: () => {
				this.setState({ alertMsg: null });
				const { navigation, clearOrderListAction, clearUserIdAction } = this.props;
				setUserIdStorage(null);
				clearOrderListAction();
				clearUserIdAction();
				navigation.navigate("Login");
			},
		});
	};

	onCall = (phoneNo: string) => {
		Linking.openURL(`tel:+91${phoneNo}`);
	};

	onDelivered = (orderId: string) => {
		this.setState({
			alertMsg: "Have you delivered this order?",
			onAlertConfirm: () => {
				if (!this.state.delevering) {
					this.setState({ delevering: true }, function() {
						OrderDeliveredApi(
							orderId,
							this.onDeliveredSuccess,
							this.onDeliveredFailure,
							this.onDeliveredError,
						);
					});
				}
			},
		});
	};

	onDeliveredSuccess = () => {
		this.setState({ alertMsg: null, delevering: false });
		this.fetchOrders();
	};

	onDeliveredFailure = (message: string) => {
		this.setState({
			alertDigMsg: message,
			delevering: false,
		});
	};

	onDeliveredError = (error: any) => {
		this.setState({
			alertDigMsg: error.toString().includes("Network Error")
				? "Please check your internet connection"
				: "Some error occured, please try again later",
			delevering: false,
		});
	};

	onAlertCancel = () => {
		this.setState({ alertMsg: null, alertDigMsg: null });
	};

	onFetchRefresh = () => {
		this.setState({ loading: true, refreshing: true });
		OrderListApi(
			this.onOrderListFetched,
			this.onOrderListFetchFailed,
			this.onOrderListFetchError,
		);
	};

	navigateToDet = (ID: string) => {
		const { navigation } = this.props;
		navigation.navigate("Details", { ID, fetchOrders: this.fetchOrders });
	};

	render() {
		const {
			loading,
			refreshing,
			alertMsg,
			onAlertConfirm,
			noRecordText,
			alertDigMsg,
		} = this.state;
		const { orders } = this.props;
		return (
			<OrderListUI
				{...this.props}
				onLogout={this.onLogout}
				onCall={this.onCall}
				onDelivered={this.onDelivered}
				onFetchRefresh={this.onFetchRefresh}
				loading={loading}
				refreshing={refreshing}
				orders={orders}
				alertMsg={alertMsg}
				onAlertConfirm={onAlertConfirm}
				onAlertCancel={this.onAlertCancel}
				navigateToDet={this.navigateToDet}
				noRecordText={noRecordText}
				alertDigMsg={alertDigMsg}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {
		orders: state.orders,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(OrderListContainer);
