/**
 * Status bar
 * Author : Murugappan V
 * Date   : 4 Oct 2018
 * @flow
 */

import React from "react";
import { StatusBar, Platform } from "react-native";
import { Colors } from "../../asset";

type Props = {
	style?: number | Object | Array<number>,
	barStyle?: string,
};

export function StatusBarComp(props: Props) {
	return (
		<StatusBar
			backgroundColor={Platform.OS == "ios" ? Colors.bgTransparent : Colors.bgSemiTransparent}
			barStyle={props.barStyle}
			translucent={true}
		/>
	);
}

StatusBarComp.defaultProps = {
	style: undefined,
	barStyle: "default",
};
