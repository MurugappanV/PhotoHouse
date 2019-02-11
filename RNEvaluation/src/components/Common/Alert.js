import { Alert } from "react-native";

export const AlertComp = (title: string, msg: string) =>
	Alert.alert(title, msg, [{ text: "OK", onPress: () => {} }], { cancelable: true });
