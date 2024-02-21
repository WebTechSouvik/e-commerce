import axios from "axios";

export const getDataFromApi = async (url) => {
	const baseUrl = "http://localhost:8000/api/v1";

	console.log(`${baseUrl}${url}`);

	const res = await axios(`${baseUrl}${url}`);
	const {data: apidata}=res;
	console.log(res)
	return apidata;
};
