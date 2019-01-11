import Types from "../Types";

// export function setOrderDetailAction(userId) {
// 	return (dispatch, getState) => {
// 		dispatch({ type: Types.order.SET_ORDER_DET_ID, userId });
// 	};
// }

// export function clearOrderDetailAction() {
// 	return (dispatch, getState) => {
// 		dispatch({ type: Types.order.CLEAR_ORDER_DET_ID });
// 	};
// }

export function setOrderListAction(data) {
	return (dispatch, getState) => {
		dispatch({ type: Types.order.SET_ORDER_LIST_ID, data });
	};
}

export function clearOrderListAction() {
	return (dispatch, getState) => {
		dispatch({ type: Types.order.CLEAR_ORDER_LIST_ID });
	};
}
