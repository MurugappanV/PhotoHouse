import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeOverlay, openOverlay } from "react-native-blur-overlay";
import LoginUI from "./LoginUI";
import { LoginApi, setCookie } from "../../service";
// import { AlertComp } from "../../components";
import { setUserIdStorage } from "../../storage";
import { Actions } from "../../redux";

type Props = {
	navigation: any,
	setUserIdAction: Function,
};

class LoginContainer extends PureComponent<Props> {
	constructor(props: Props) {
		super(props);
		this.state = {
			employeeId: "",
			password: "",
			loading: false,
			alertTitle: null,
			alertMsg: null,
		};
	}

	onIdInputChange = (employeeId: string) => {
		this.setState({ employeeId });
	};

	onPasswordInputChange = (password: string) => {
		this.setState({ password });
	};

	onLogin = () => {
		const { employeeId, password } = this.state;
		this.setState({ loading: true });
		LoginApi(employeeId, password, this.onLoginSuccess, this.onLoginFailure, this.onLoginError);
	};

	onLoginSuccess = (userId: Object) => {
		const { navigation, setUserIdAction } = this.props;
		this.setState({ loading: false });
		setCookie(userId);
		setUserIdStorage(userId);
		setUserIdAction(userId);
		navigation.navigate("Home");
	};

	onLoginFailure = (message: string) => {
		if (message === "Failure") {
			message = "Please check your employee ID and password";
		}
		this.setState({ loading: false, alertTitle: "Login Failed", alertMsg: message });
		openOverlay();
		// AlertComp("Login Failed", message);
	};

	onLoginError = (error: any) => {
		this.setState({
			loading: false,
			alertTitle: "Login error",
			alertMsg: error.toString().includes("Network Error")
				? "Please check your internet connection"
				: "Some error occured, please try again later",
		});
		openOverlay();
		// AlertComp("Login error", "Some error occured, Please try again");
	};

	onAlertClose = () => {
		this.setState({
			alertTitle: null,
			alertMsg: null,
		});
		closeOverlay();
	};

	render() {
		const { employeeId, password, loading, alertMsg, alertTitle } = this.state;
		return (
			<LoginUI
				{...this.props}
				onIdInputChange={this.onIdInputChange}
				onPasswordInputChange={this.onPasswordInputChange}
				onLogin={this.onLogin}
				employeeId={employeeId}
				password={password}
				loading={loading}
				alertMsg={alertMsg}
				alertTitle={alertTitle}
				onAlertClose={this.onAlertClose}
			/>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(LoginContainer);
