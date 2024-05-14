import axios from "axios";

axios.defaults.withCredentials = true;

export const getAdminProduct = async () => {
	const { data } = await axios("/api/v1/product/admin");

	return data;
};

export const createProduct = async (productInfo) => {
	const configs = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};

	const { data } = await axios.post(
		"/api/v1/product/admin",
		productInfo,
		configs,
	);

	return data;
};

export const updateProductDetalis = async (id) => {
	const { data } = await axios("/api/v1/product/details/" + id);
	return data;
};

export const updateProduct = async (id, productInfo) => {
	const configs = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const { data } = await axios.put(
		"/api/v1/product/admin/" + id,
		productInfo,
		configs,
	);

	return data;
};

export const deleteProduct = async (productId) => {
	const { data } = await axios.delete("/api/v1/product/admin/" + productId);

	return data;
};

export const updateOrder = async (orderId, orderStatus) => {
	console.log(orderStatus);

	const configs = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const { data } = await axios.put(
		"/api/v1/order/" + orderId,
		{ orderStatus },
		configs,
	);
	return data;
};

export const getAllOrder = async () => {
	const configs = {
		withCredentials: true,
	};
	const { data } = await axios("/api/v1/order", configs);
	return data;
};

export const deleteOrder = async (orderId) => {
	const { data } = await axios.delete("/api/v1/order/" + orderId);
	return data;
};

export const getAllUser = async () => {
	const { data } = await axios("/api/v1/user/admin");

	return data;
};

export const deleteUser = async (userId) => {
	console.log(userId);
	const { data } = await axios.delete("/api/v1/user/admin/" + userId);

	return data;
};
