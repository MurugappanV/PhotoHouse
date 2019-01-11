import { BaseAxiosInstance } from "../axios";

const OrderDeliveredApi = (orderId, onSuccess, onFailure, onError) => {
	const url = "CrewMemberServices.svc/CloseOrder";
	BaseAxiosInstance.get(url, { headers: { OrderID: orderId } })
		.then((response: any) => {
			if (response.data.s === 1) {
				onSuccess(response.data.m);
			} else {
				onFailure(response.data.m);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default OrderDeliveredApi;
