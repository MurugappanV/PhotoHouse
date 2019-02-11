/**
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Provider } from "react-redux";
import SplashScreen from "react-native-splash-screen";
import { Navigator, Store } from "./src";

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
