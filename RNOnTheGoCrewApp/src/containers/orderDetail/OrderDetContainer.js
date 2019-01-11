import React, { PureComponent } from "react";
import { Linking } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrderDetUI from "./OrderDetUI";
import { setUserIdStorage } from "../../storage";
import { Actions } from "../../redux";
import { OrderDetailApi, OrderDeliveredApi } from "../../service";

type Props = {
	navigation: any,
	orders: any,
	clearOrderListAction: Function,
	clearUserIdAction: Function,
};

class OrderDetContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		const orderId = props.navigation.getParam("ID", null);
		const fetchOrders = props.navigation.getParam("fetchOrders", () => {});
		const order = props.orders.find(obj => obj.ID === orderId);
		if (!order) {
			props.navigation.goBack();
		}
		this.state = {
			loading: true,
			order: order,
			delevering: false,
			details: null,
			alertMsg: null,
			alertDigMsg: null,
			onAlertConfirm: () => {},
			fetchOrders: fetchOrders,
		};
		OrderDetailApi(
			order.OrderNumber,
			this.onOrderDetFetched,
			this.onOrderDetFetchFailed,
			this.onOrderDetFetchError,
		);
	}

	onOrderDetFetched = (details: any) => {
		this.setState({ loading: false, details: details });
	};

	onOrderDetFetchFailed = (message: string) => {
		this.setState({ loading: false, details: null });
		this.setState({
			alertDigMsg: `Order details can't be fetched ${message}`,
		});
	};

	onOrderDetFetchError = (error: any) => {
		this.setState({ loading: false, details: null });
		this.setState({
			alertDigMsg: error.toString().includes("Network Error")
				? "Order details can't be fetched, Please check your internet connection"
				: "Order details can't be fetched, Some error occured, please try again later",
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
		const { fetchOrders } = this.state;
		fetchOrders();
		const { navigation } = this.props;
		navigation.navigate("List");
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

	render() {
		const { loading, details, alertMsg, onAlertConfirm, order, alertDigMsg } = this.state;
		const {
			ID,
			OrderNumber,
			OrderDate,
			CustomerName,
			VehicleNo,
			CustomerPhoneNumber,
			OrdDate,
		} = order;
		return (
			<OrderDetUI
				{...this.props}
				onLogout={this.onLogout}
				orderId={ID}
				OrderNumber={OrderNumber}
				OrderDate={OrderDate}
				name={CustomerName}
				vehilceNo={VehicleNo}
				phoneNo={CustomerPhoneNumber}
				onCall={this.onCall}
				onDelivered={this.onDelivered}
				details={details}
				loading={loading}
				alertMsg={alertMsg}
				alertDigMsg={alertDigMsg}
				onAlertConfirm={onAlertConfirm}
				onAlertCancel={this.onAlertCancel}
				OrdDate={OrdDate}
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
)(OrderDetContainer);
