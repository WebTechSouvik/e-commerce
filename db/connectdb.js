import mongoose from "mongoose";

const connectDb = async () => {
	try {
		const connection = await mongoose.connect(
			`${process.env.MONGODB_URL}/e-commers`,
		);
		console.log(
			"connect mongodb sucessfilly!! db host",
			connection.connection.host,
		);
	} catch (err) {
		console.log("mongo db connetion failed", err);
	}
};

export default connectDb;
