/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import { Navigator, Store } from "./src";
import { Platform, StyleSheet, Text, View } from "react-native";
import { GlobalProps } from "./src";
import SplashScreen from "react-native-splash-screen";

type Props = {};
export default class App extends Component<Props> {
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
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
