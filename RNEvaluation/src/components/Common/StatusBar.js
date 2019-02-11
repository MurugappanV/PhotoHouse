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
	barStyle?: string,
};

export function StatusBarComp(props: Props) {
	return (
		<StatusBar
			backgroundColor={
				Platform.OS === "ios" ? Colors.bgTransparent : Colors.bgSemiTransparent
			}
			barStyle={props.barStyle}
			translucent
		/>
	);
}

StatusBarComp.defaultProps = {
	barStyle: "default",
};
