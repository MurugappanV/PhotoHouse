import { BaseAxiosInstance } from "../axios";

const OrderDetailApi = (orderNo, onSuccess, onFailure, onError) => {
	const url = "ProcessOrder.svc/GetOrderDetailsByOrderNo";
	BaseAxiosInstance.get(url, { headers: { OrderNo: orderNo } })
		.then((response: any) => {
			if (response.data.s === 1) {
				onSuccess(response.data.data);
			} else {
				onFailure(response.data.m);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default OrderDetailApi;
