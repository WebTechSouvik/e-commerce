import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true,"username is requried"],
		unique: [true,"username already exist"]
	
	},

	email: {
		type: String,
		required: [true,"email is requried"],
		unique: [true,"username already exist"]
		
	},
	fullname: {
		type: String,
	required: [true,"fullname is requried"]
		// lowercase: true,
	},
	password: {
		type: String,
		required: [true, "password is requirid"],
	},
	avtar: {
		public_id:{
			type: String,
		},
		url:{
			type: String,
		}
		
	},
	role: {
		type: String,
		default: "user",
	}
	
});

userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		this.password = bcrypt.hashSync(this.password, 10);
		next();
	}
	next();
});
userSchema.methods.checkPassword = function (password) {
	// console.log(password)

	return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model("User", userSchema);
