import axios from "axios";

export const getDataFromApi = async (url) => {
	const baseUrl = "http://localhost:8000/api/v1";

	console.log(`${baseUrl}${url}`);

	const {data:apidata} = await axios(`${baseUrl}${url}`);
	// console.log(apidata)
	return apidata;
};
