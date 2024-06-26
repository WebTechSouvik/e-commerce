import axios from "axios";

export const userLogin = async (loginInfo) => {
	const config = {
		headers: { "Content-Type": "application/json" },
		withCredentials: true,
	};

	const res = await axios.post("/api/v1/user/login", loginInfo, config);
	console.log(res);
	const { data } = res;
	return data;
};

export const userDetalis = async () => {
	const { data } = await axios("/api/v1/user/detalis", {
		withCredentials: true,
	});

	return data;
};

export const userRegister = async (registerInfo) => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	};
	const { data } = await axios.post(
		"/api/v1/user/register",
		registerInfo,
		config,
	);

	return data;
};

export const userLogout = async () => {
	const { data } = await axios.post("/api/v1/user/logout", null, {
		withCredentials: true,
	});
	return data;
};
