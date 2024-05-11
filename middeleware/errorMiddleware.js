export const errorhaldeler = (err, req, res, next) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			message: err.message,
			status: err.status,
		});
	} else if (err.name === "ValidationError") {
		const errMsgArray = Object.values(err.errors).map((err) => err.message);

		const errMsg = errMsgArray.join(". ");

		res.status(400).json({
			message: errMsg,
			status: "fail",
		});
	} 
	else if (err.code === 11000) {
		const errMsg = `${Object.keys(err.keyPattern)[0]} already exist`;
		res.status(400).json({
			message: errMsg,
			status: "fail",
		});
	}
	 else {
		res.status(500).json({
			message:
				"Something went wrong.Please try again after sometimes......",
			status: "Error",
		});
	}
};
