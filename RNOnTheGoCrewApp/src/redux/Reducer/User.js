import Types from "../Types";
import createReducer from "./CreateReducer";

export const userId = createReducer(null, {
	[Types.user.SET_USER_ID](state, action) {
		return action.userId;
	},
	[Types.user.CLEAR_USER_ID]() {
		return null;
	},
});
