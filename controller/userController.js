import { User } from "../model/userModel.js";
import { generateToken } from "../utils/tokens.js";
import asyncHandler from "../utils/asynchandler.js";
import Apierror from "../utils/customerror.js";

const registerController = asyncHandler(async (req, res, next) => {
	const { username, email, fullname, password } = req.body;

	if (!username || !email || !fullname || !password) {
		next(new Apierror("all fiels is requried"), 400);
	}

	const existenceuser = await User.findOne({ email });

	if (existenceuser) {
		throw new Apierror("user already exist", 400);
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
});

const loginController = asyncHandler(async (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		throw new Apierror("username and password is requirid", 400);
	}

	const user = await User.findOne({ username });

	if (!user) {
		throw new Apierror("username does not exist", 400);
	}

	const isCorrect = user.checkPassword(password);

	if (!isCorrect) {
		throw new Apierror("invalid password", 400);
	}

	const userToken = generateToken(user._id);

	return res
		.status(201)
		.send({ succes: true, message: "login succsesfully", userToken });
});

export { registerController, loginController };
