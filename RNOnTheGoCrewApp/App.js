/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from "react";
import { Provider } from "react-redux";
// import { Platform, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { Navigator, Store } from "./src";

export default class App extends PureComponent {
	componentDidMount() {
		SplashScreen.hide();
	}

	render() {
		return (
			<Provider store={Store}>
				<Navigator />
			</Provider>
		);
	}
}

// const instructions = Platform.select({
// 	ios: "Press Cmd+R to reload,\n Cmd+D or shake for dev menu",
// 	android: "Double tap R on your keyboard to reload,\n Shake or press menu button for dev menu",
// });

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "#F5FCFF",
// 	},
// 	welcome: {
// 		fontSize: 20,
// 		textAlign: "center",
// 		margin: 10,
// 	},
// 	instructions: {
// 		textAlign: "center",
// 		color: "#333333",
// 		marginBottom: 5,
// 	},
// });
