import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import { TextField } from "react-native-material-textfield";
import BlurOverlay from "react-native-blur-overlay";
import { Button, AlertComp } from "../../components";
import { Header } from "../header";
import { ScalePerctFullHeight, ScalePerctFullWidth } from "../../asset";

type Props = {
	employeeId: string,
	password: string,
	onIdInputChange: Function,
	onPasswordInputChange: Function,
	onLogin: Function,
	loading: boolean,
	alertTitle: string,
	alertMsg: string,
	onAlertClose: Function,
};

export default class LoginUI extends PureComponent<Props> {
	render() {
		const {
			employeeId,
			password,
			onIdInputChange,
			onPasswordInputChange,
			onLogin,
			loading,
			alertTitle,
			alertMsg,
			onAlertClose,
		} = this.props;
		return (
			<View style={styles.container}>
				<Header title="Login" />
				<AlertComp
					alertMsg={alertMsg}
					isVisible={!!alertMsg}
					okBtnText="OK"
					onOk={onAlertClose}
					onCancel={onAlertClose}
					cancelBtnText={null}
				/>
				<View style={styles.inputContainer}>
					<TextField
						onSubmitEditing={() => this.textInput.focus()}
						returnKeyType="next"
						label="Enter Employee ID"
						value={employeeId}
						onChangeText={id => onIdInputChange(id)}
					/>
					<TextField
						ref={component => (this.textInput = component)}
						returnKeyType="done"
						secureTextEntry
						onSubmitEditing={onLogin}
						label="Enter password"
						value={password}
						onChangeText={pass => onPasswordInputChange(pass)}
					/>
				</View>
				<Button style={styles.loginBtn} title="LOGIN" onPress={onLogin} loading={loading} />
				<BlurOverlay
					radius={10}
					downsampling={4}
					brightness={0}
					onPress={() => {}}
					customStyles={{
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "rgba(255,255,255,0.2)",
					}}
					style={{
						elevation: 10,
					}}
				/>
			</View>
		);
	}
}

LoginUI.defaultProps = {};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loginBtn: {
		alignSelf: "center",
		width: "40%",
	},
	inputContainer: {
		paddingHorizontal: ScalePerctFullWidth(10),
		paddingVertical: ScalePerctFullHeight(10),
	},
});
