import { User } from "../model/userModel.js";
import { generateToken } from "../utils/tokens.js";

const registerController = async (req, res) => {
	const { username, email, fullname, password } = req.body;

	try {
		if (!username || !email || !fullname || !password) {
			return res.send({ error: "all field is required" });
		}

		const existenceuser = await User.findOne({ email });

		if (existenceuser) {
			return res.send({ succes: true, message: "user allready exist" });
		}

		const user = await User.create({
			username,
			email,
			fullname,
			password,
			avtar: "image",
		});

		return res.status(201).send({
			succes: true,
			message: "user register succes fully",
			user,
		});
	} catch (err) {
		return res
			.status(500)
			.send({ succes: false, message: "error in registration", err });
	}
};

const loginController = async (req, res) => {
	const { username, password } = req.body;

	try {
		if (!username || !password) {
			return res.send({
				errro: "username and password is requried for login",
			});
		}

		const user = await User.findOne({ username });

		if (!user) {
			return res.send({ error: "username doese not exisr" });
		}

		const isCorrect = user.checkPassword(password);

		if (!isCorrect) {
			return res.send({ error: "invalid password" });
		}

		const userToken = generateToken(user._id);

		return res
			.status(201)
			.send({ succes: true, message: "login succsesfully", userToken });
	} catch (err) {
		return res
			.status(500)
			.send({ succes: false, message: "error in login", err });
	}
};

export { registerController, loginController };
