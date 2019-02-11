/**
 * @flow
 */
import React, { PureComponent } from "react";
import { NetInfo } from "react-native";
import HomeNavigator from "./HomeNavigator";
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

	componentWillUnmount() {
		NetInfo.isConnected.removeEventListener("connectionChange", this.handleConnectivityChange);
	}

	handleConnectivityChange = (isConnected: boolean) => {
		this.setState({ isConnected });
	};

	render() {
		if (this.state.isConnected) {
			return <HomeNavigator />;
		}
		return <AlertPageCont />;
	}
}
