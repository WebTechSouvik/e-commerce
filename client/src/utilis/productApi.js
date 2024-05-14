import axios from "axios";

export const getAllProduct = async (query) => {
	const { data } = await axios(
		"http://localhost:8000/api/v1/product" + query,
	);

	return data;
};

export const getFeatureProduct = async () => {
	const { data } = await axios("/api/v1/product/?page=1&limit=8");
	return data;
};

export const getSingleProduct = async (id) => {
	const { data } = await axios("/api/v1/product/details" + id);
	return data;
};

export const addReview = async (id, reviewInfo) => {
	const configs = {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	};

	const { data } = await axios.post(
		"/api/v1/product/review/" + id,
		reviewInfo,
		configs,
	);
	return data;
};
