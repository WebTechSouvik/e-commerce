import mongoose from "mongoose";
import bcrypt from"bcrypt"

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	fullname: {
		type: String,
		required: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: [true, "password is requirid"],
	},
	avtar: {
		type: String,
	},
	role:{
		type:String,
		default:"user"
	}
});



userSchema.pre("save",function (next){
	if(this.isModified("password")){
this.password= bcrypt.hashSync(this.password,10)
next()
}
next()

})
userSchema.methods.checkPassword= function (password){
	// console.log(password)

return  bcrypt.compareSync(password,this.password)
}


export const User = mongoose.model("User", userSchema);
