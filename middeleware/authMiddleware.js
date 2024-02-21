import jwt from "jsonwebtoken";
import Apierror from "../utils/customerror.js"

export const authorization = (req, res, next) => {
	const token = req.cookies.userToken;
	// console.log(token)
	try {
		const decode = jwt.verify(token, process.env.SECRET_KEY);

		req.user = decode.id;
		next();
	} catch (err) {

		const error=new Apierror(err.message,404)
		next(error)
	}
};
