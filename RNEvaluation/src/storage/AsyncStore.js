import { AsyncStorage } from "react-native";

export function setAuthValue(authToken) {
	if (authToken == null) {
		AsyncStorage.removeItem("authTokens");
	} else {
		AsyncStorage.setItem("authTokens", authToken);
	}
}

export function getAuthValue() {
	return AsyncStorage.getItem("authTokens");
}
