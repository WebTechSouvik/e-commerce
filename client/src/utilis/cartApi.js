import axios from "axios";

export const addToACart = async (productId, quantity) => {
	const configs = {
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	};
	const { data } = await axios.post(
		"http://localhost:8000/api/v1/cart",
		{ productId, quantity },
		configs,
	);

	return data;
};

export const getAllItems = async () => {
	const configs = {
		withCredentials: true,
	};

	const { data } = await axios("http://localhost:8000/api/v1/cart", configs);
	return data;
};

export const deleteFromCart = async (productId) => {
	const configs = {
		withCredentials: true,
	};

	const { data } = await axios.delete(
		"http://localhost:8000/api/v1/cart/" + productId,configs,);
	return data;
};
