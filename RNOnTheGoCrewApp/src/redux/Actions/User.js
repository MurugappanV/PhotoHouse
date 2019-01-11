import Types from "../Types";

export function setUserIdAction(userId) {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.SET_USER_ID, userId });
	};
}

export function clearUserIdAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.user.CLEAR_USER_ID });
	};
}
