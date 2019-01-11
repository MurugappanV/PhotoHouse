/**
 * Home Navigator , stacks between map and details
 * Author : Murugappan V
 * Date   : 10 Nov 2018
 * @flow
 */
import React, { PureComponent } from "react";
import { createStackNavigator } from "react-navigation";
import { PlaceMapCont, RouteCont } from "../containers";

type Props = {};

export class HomeNavigator extends PureComponent<Props> {
	render() {
		return <Stack />;
	}
}

const Stack = createStackNavigator(
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
