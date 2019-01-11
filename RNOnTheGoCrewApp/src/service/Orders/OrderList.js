import { BaseAxiosInstance } from "../axios";

const OrderListApi = (onSuccess, onFailure, onError) => {
	const url = "CrewMemberServices.svc/GetOrders";
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.s === 1) {
				onSuccess(response.data.data);
			} else {
				if (response.data.m === "No records found") {
					onSuccess(response.data.data);
				} else {
					onFailure(response.data.m);
				}
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default OrderListApi;
