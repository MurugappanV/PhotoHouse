import { BaseAxiosInstance } from "../axios";
import { API_KEY } from "../Defaults";

export const PlaceRouteApi = (lat, long, placeId, success, failure) => {
	const url = `directions/json?origin=${lat}, ${long}&destination=place_id:${placeId}&mode=walking&key=${API_KEY}`;
	BaseAxiosInstance.get(url)
		.then((response: any) => {
			if (response.data.routes != null) {
				success(response.data.routes[0].legs[0]);
			} else {
				failure(response);
			}
		})
		.catch((error: any) => {
			failure(error);
		});
};
