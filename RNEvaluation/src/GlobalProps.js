/**
 *
 * @format
 * @flow
 */

import { setCustomTextInput, setCustomText } from "react-native-global-props";

const customTextInputProps = {
	style: {
		fontFamily: "HP Simplified Regular",
	},
};

const customTextProps = {
	style: {
		fontFamily: "HP Simplified Regular",
		letterSpacing: 0.5,
	},
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);
