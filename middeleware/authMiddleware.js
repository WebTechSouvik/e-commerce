import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
	const token = req.headers.authorization;
	try {
		const decode = jwt.verify(token, process.env.SECRET_KEY);

		req.user = decode.id;
		next();
	} catch (err) {
		return res.send({ message: "unauthorize", err });
	}
};
