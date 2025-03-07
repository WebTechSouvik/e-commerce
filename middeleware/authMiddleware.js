import jwt from "jsonwebtoken";
import Apierror from "../utils/customerror.js"

export const authorization = (req, res, next) => {
	const token = req.Cookies.userToken;
	
	try {
		const decode = jwt.verify(token, process.env.SECRET_KEY);

		req.user = decode.id;
		
		next();
	} catch (err) {

		const error=new Apierror("please login first",404)
		next(error)
	}
};
