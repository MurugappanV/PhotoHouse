import Types from "../Types";
import createReducer from "./CreateReducer";

export const orders = createReducer([], {
	[Types.order.SET_ORDER_LIST_ID](state, action) {
		return action.data;
	},
	[Types.order.CLEAR_ORDER_LIST_ID]() {
		return [];
	},
});
