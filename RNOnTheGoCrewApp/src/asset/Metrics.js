/**
 * Metrics of device and default values
 * Author : Murugappan V
 * Date   : 9 Jan 2018
 * @flow
 */
import { Dimensions } from "react-native";
import { ScalePerctFullWidth } from "./Scale";

// device sizes
const FULL_DEVICE_HEIGHT = Dimensions.get("window").height;
const FULL_DEVICE_WIDTH = Dimensions.get("window").width;

// text sizes
const SMALL_TEXT_SIZE = 13;
const MEDIUM_TEXT_SIZE = 15;
const LARGE_TEXT_SIZE = 20;
const EXTRA_LARGE_TEXT_SIZE = 30;

// border radius
const SMOOTH_CORNER = 3;
const SMALL_RADIUS = 5;
const MEDIUM_RADIUS = 10;
const LARGE_RADIUS = 20;

const DEFAULT_PADDING = ScalePerctFullWidth(4);

const Metrics = {
	FULL_DEVICE_HEIGHT,
	FULL_DEVICE_WIDTH,

	SMALL_TEXT_SIZE,
	MEDIUM_TEXT_SIZE,
	LARGE_TEXT_SIZE,
	EXTRA_LARGE_TEXT_SIZE,

	SMOOTH_CORNER,
	SMALL_RADIUS,
	MEDIUM_RADIUS,
	LARGE_RADIUS,

	DEFAULT_PADDING,
};

export default Metrics;
