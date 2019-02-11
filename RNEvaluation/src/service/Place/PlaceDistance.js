import { BaseAxiosInstance } from "../axios";
import { API_KEY } from "../Defaults";

export const PlaceDistanceApi = (lat, long, placeId, success, failure) => {
	const url = `distancematrix/json?origins=${lat}, ${long}&destinations=place_id:${placeId}&key=${API_KEY}`;
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.results != null) {
				success(response.data.results);
			} else {
				failure(response);
			}
		})
		.catch((error: any) => {
			failure(error);
		});
};
