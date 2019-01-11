import { BaseAxiosInstance } from "../axios";
import { API_KEY } from "../Defaults";

export const PlaceDistanceApi = (lat, long, placeId, success, failure) => {
	let url = `distancematrix/json?origins=${lat}, ${long}&destinations=place_id:${placeId}&key=${API_KEY}`;
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
