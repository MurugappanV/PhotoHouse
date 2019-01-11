import { AsyncStorage } from "react-native";

export function setUserIdStorage(userId) {
	if (userId == null) {
		AsyncStorage.removeItem("userId");
	} else {
		AsyncStorage.setItem("userId", userId);
	}
}

export function getUserIdStorage() {
	return AsyncStorage.getItem("userId");
}
