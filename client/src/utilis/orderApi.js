import axiox from "axios";

export const createOrder = async (orderInfo) => {
	// console.log(orderInfo)

	const configs = {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	};

	const { data } = await axiox.post("/api/v1/order", orderInfo, configs);
	return data;
};

export const getMyOrder = async () => {
	const configs = {
		withCredentials: true,
	};

	const { data } = await axiox("/api/v1/order/user", configs);
	return data;
};

export const getOrderDetalis = async (id) => {
	const configs = {
		withCredentials: true,
	};

	const { data } = await axiox(`/api/v1/order/${id}`, configs);
	return data;
};

export const getAllOrder = async () => {
	const configs = {
		withCredentials: true,
	};
	const { data } = await axiox("/api/v1/order", configs);
	return data;
};
