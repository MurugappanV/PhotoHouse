import React, { PureComponent } from "react";
import { View, StyleSheet, NativeModules } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Actions } from "../../redux";
import { Colors, ScalePerctFullWidth, ScalePerctFullHeight } from "../../asset";
import { getUserIdStorage } from "../../storage";
import { setCookie } from "../../service";
import { LoadingComp } from "../../components";

type Props = {
	navigation: any,
	setUserIdAction: Function,
};

class AuthLoadContainer extends PureComponent<Props> {
	constructor(props) {
		super(props);
		getUserIdStorage()
			.then((userId: string) => {
				if (userId != null) {
					setCookie(userId);
					props.setUserIdAction(userId);
					props.navigation.navigate("Home");
				} else {
					props.navigation.navigate("Login");
				}
			})
			.catch(() => {
				props.navigation.navigate("Login");
			});
		NativeModules.Device.getDeviceName((err, name) => console.log(err, name));
	}

	render() {
		return (
			<View style={styles.container}>
				<LoadingComp title="Authenticating..." />
			</View>
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
)(AuthLoadContainer);

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		backgroundColor: Colors.bgPrimaryDark,
		width: ScalePerctFullWidth(100),
		height: ScalePerctFullHeight(100),
	},
});
