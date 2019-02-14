import { Alert } from "react-native";
import { Strings } from "../../asset";

export const AlertComp = (title: string, msg: string, okLabel: string = Strings.ok) =>
	Alert.alert(title, msg, [{ text: okLabel, onPress: () => {} }], { cancelable: true });
