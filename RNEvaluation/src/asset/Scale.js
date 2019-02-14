/**
 * @flow
 */

import { Dimensions } from "react-native";

const gDesignSampleTotalWidth = 360;
const gDesignSampleTotalHeight = 640;
const gFullHeight = Dimensions.get("window").height;
const gFullWidth = Dimensions.get("window").width;

export const FULL_DEVICE_HEIGHT = gFullHeight;
export const FULL_DEVICE_WIDTH = gFullWidth;

export const ScalePerctFullHeight = (height: number) => {
	return (gFullHeight * height) / 100;
};

export const ScalePerctFullWidth = (width: number) => {
	return (gFullWidth * width) / 100;
};

export const ScaleSampDesgHeight = (height: number) => {
	return (gFullHeight * height) / gDesignSampleTotalHeight;
};

export const ScaleSampDesgWidth = (width: number) => {
	return (gFullWidth * width) / gDesignSampleTotalWidth;
};

export const ScaleMinSampleDesg = (height: number, width: number) => {
	if (gFullHeight > gFullWidth) {
		return ScaleSampDesgWidth(width);
	} else {
		return ScaleSampDesgHeight(height);
	}
};
