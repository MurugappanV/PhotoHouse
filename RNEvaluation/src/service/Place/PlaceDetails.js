import { BaseAxiosInstance } from "../axios";
import { API_KEY } from "../Defaults";

export const PlaceDetailApi = (placeId, success, failure) => {
	let url = `place/details/json?placeid=${placeId}&key=${API_KEY}`;
	BaseAxiosInstance.get(url)
		.then(function(response) {
			console.log("settings response", response);
			if (response.data.results != null) {
				success(response.data.results);
			} else {
				failure(response);
			}
		})
		.catch(function(error) {
			console.log("settings error", error);
			failure(error);
		});
};
