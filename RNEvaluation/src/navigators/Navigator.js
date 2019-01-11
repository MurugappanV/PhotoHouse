/**
 * Navigator , switches between app and no connection
 * Author : Murugappan V
 * Date   : 10 Nov 2018
 * @flow
 */
import React, { PureComponent } from "react";
import { NetInfo } from "react-native";
import { HomeNavigator } from "./HomeNavigator";
import { AlertPageCont } from "../containers";

type Props = {};
type State = {
	isConnected: boolean,
};

export class Navigator extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { isConnected: true };
	}

	componentDidMount() {
		NetInfo.isConnected.addEventListener("connectionChange", this.handleConnectivityChange);
	}

	handleConnectivityChange = (isConnected: boolean) => {
		this.setState({ isConnected });
	};

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectivityChange);
	}

	render() {
		if (this.state.isConnected) {
			return <HomeNavigator />;
		} else {
			return <AlertPageCont />;
		}
	}
}
