/**
 * @flow
 */
import React from "react";
import { createStackNavigator } from "react-navigation";
import { PlaceMapCont, RouteCont } from "../containers";

const HomeNavigator = createStackNavigator(
	{
		Map: { screen: PlaceMapCont },
		Route: { screen: RouteCont },
	},
	{
		navigationOptions: () => ({
			header: null,
		}),
	},
);

export default HomeNavigator;
