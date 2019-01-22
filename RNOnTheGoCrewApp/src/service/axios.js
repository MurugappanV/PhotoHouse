import axios from "axios";

const BASE_URL_UAT = "https://servicesbr.uat.mcdelivery.co.in/";
// const BASE_URL_IP = "http://34.232.141.238/api/v1/";
// const BASE_URL_PRODUCTION = "https://myknowledge.www.printos.com/api/v1/";

export const BaseAxiosInstance = axios.create({
	baseURL: BASE_URL_UAT,
	timeout: 60000,
	headers: { "Content-Type": "application/json", "Cache-Control": "no-cache" },
});

export const setCookie = (token: any) => {
	BaseAxiosInstance.defaults.headers.common["UserID"] = token;
};
