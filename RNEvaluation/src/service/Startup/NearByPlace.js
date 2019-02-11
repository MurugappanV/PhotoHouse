import { BaseAxiosInstance } from "../axios";
import { API_KEY } from "../Defaults";

export const NearByPlaceApi = (lat, long, type, keyword, success, failure) => {
	const url = `place/nearbysearch/json?location=${lat}, ${long}&rankby=distance&type=${type}&keyword=${keyword}&key=${API_KEY}`;
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			// console.log("response", response);
			if (response.data.results != null && response.data.results.length > 0) {
				success(type, response.data.results.slice(0, 3));
			} else {
				failure(type, response);
			}
		})
		.catch((error: any) => {
			// console.log("error", error);
			failure(type, error);
		});
};
