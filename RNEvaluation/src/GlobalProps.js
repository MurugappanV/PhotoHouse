/**
 *
 * @format
 * @flow
 */

import React from "react";
import { setCustomTextInput, setCustomText } from "react-native-global-props";

// const customViewProps = {
//   style: {
//     backgroundColor: '#d3d3d3' // light gray
//   }
// };

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

// const customImageProps = {
//   resizeMode: 'cover'
// };

// const customTouchableOpacityProps = {
//   hitSlop: { top: 15, right: 15, left: 15, bottom: 15 }
// };

// Calling the functions and passing the custom props into their respective params
// setCustomView(customViewProps);
setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);
// setCustomImage(customImageProps);
// setCustomTouchableOpacity(customTouchableOpacityProps);
