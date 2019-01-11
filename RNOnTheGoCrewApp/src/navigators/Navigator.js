/**
 * First Navigator , swicthes between login and home
 * Author : Murugappan V
 * Date   : 8 Jan 2018
 * @flow
 */

import React, { PureComponent } from "react";
import { View } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { Login, OrderDetail, OrderList, AuthLoading } from "../containers";
// import { AuthNavigator } from "./AuthNavigator";
// import { HomeStack } from "./HomeStack";

const Stack = createStackNavigator(
	{
		List: { screen: OrderList },
		Details: { screen: OrderDetail },
	},
	{
		defaultNavigationOptions: () => ({
			header: null,
		}),
	},
);

const NavContainer = createAppContainer(
	createSwitchNavigator(
		{
			AuthLoading,
			Home: Stack,
			Login,
		},
		{
			initialRouteName: "AuthLoading",
		},
	),
);

export default class Navigator extends PureComponent {
	render() {
		return <NavContainer />;
	}
}

// import React, { PureComponent } from "react";
// import { View, Text } from "react-native";

// export class Navigator extends PureComponent {
// 	render() {
// 		return (
// 			<View>
// 				<Text>Navigator</Text>
// 			</View>
// 		);
// 	}
// }
