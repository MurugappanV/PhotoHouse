/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

// keytool -genkey -v -keystore E:\on-the-go-crew.keystore -alias on-the-go-crew-alias -keyalg RSA -keysize 2048 -validity 10000
