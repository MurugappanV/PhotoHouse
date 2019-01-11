import { BaseAxiosInstance } from "../axios";

const LoginApi = (userName, password, onSuccess, onFailure, onError) => {
	const url = "CrewMemberServices.svc/ValidateCrewUser";
	// login='robodiego'
	// password='Buddy6jar!'
	BaseAxiosInstance.post(url, { UserName: userName, Password: password })
		.then((response: any) => {
			if (response.data.s === 1) {
				onSuccess(response.data.data.UserKey);
			} else {
				onFailure(response.data.m);
			}
		})
		.catch((error: any) => {
			onError(error);
		});
};

export default LoginApi;
