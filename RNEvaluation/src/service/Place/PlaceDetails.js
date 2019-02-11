import { BaseAxiosInstance } from "../axios";
import { API_KEY } from "../Defaults";

export const PlaceDetailApi = (placeId, success, failure) => {
	const url = `place/details/json?placeid=${placeId}&key=${API_KEY}`;
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
