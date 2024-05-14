import { User } from "../model/userModel.js";
import { generateToken } from "../utils/tokens.js";
import asyncHandler from "../utils/asynchandler.js";
import Apierror from "../utils/customerror.js";
import { uploadCloudinary } from "../utils/uploadCloudinary.js";
import { v2 as cloudinary } from "cloudinary"

// register of a user

const registerController = asyncHandler(async (req, res, next) => {
	const { username, email, fullname, password, avatar,role } = req.body;
	

	const existenceuser = await User.findOne({ email });

	if (existenceuser) {
		throw new Apierror("user already exist", 400);
	}
	
	const avatarLocalPath = req?.file?.path;
	const cloudinaryResponse = await uploadCloudinary(avatarLocalPath);


	const user = await User.create({
		username,
		email,
		fullname,
		password,
		avtar: {
			public_id:cloudinaryResponse?.public_id,
			url:cloudinaryResponse?.secure_url ||""
	},
	 role

	});

	return res.status(201).send({
		status: "sucess",
		message: "user register succes fully",
		user,
	});
});


// log in by a user

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

	const options = {
		httpOnly: false,
	};

	return res
		.status(201)
		.cookie("userToken", userToken, options)
		.send({ status: "sucess", message: "login succsesfully" });
});

// get details of a user

const userDetalisController = asyncHandler(async (req, res) => {
	const id = req.user;

	const user = await User.findById(id).select(["-password","-avtar.public_id"]);

	if (!user) {
		throw new Apierror("user not found", 400);
	}

	return res.status(200).json({
		status: "sucess",
		user,
		message: "user detalis fetch sucess",
	});
});

// logout by user

const userLogoutController = asyncHandler(async (req, res) => {
	const options = {
		httpOnly: true,
	};

	res.status(200)
		.clearCookie("userToken", options)
		.json({ status: "sucess", message: "Logout succsesfully" });
});



const getAlluser=asyncHandler(async(req,res)=>{

const users=await User.find().select("-password")

res.status(200).json({status:"sucess",users,message:"all user fetch sucessfully"})

})

// get all user of admin

const updateUserRole=asyncHandler(async(req,res)=>{

const {Id}=req.params

const user=await User.findByIdAndUpdate(Id,req.body,{new:true})

res.status(201).json({status:"sucess",message:"role update sucessfull"})

})

 // delete a user by admin
const deleteUser=asyncHandler(async(req,res)=>{

const user=await User.findById(req.params.Id)

if(!user){
	throw new Apierror("user does not exist")
}
if(user.avatar){
	await cloudinary.uploader.destroy(user.avatar.public_id)
}


await User.findByIdAndDelete(req.params.Id)

res.status(201).json({status:"sucess",message:"user deleted sucessfull",user})

})

export {
	registerController,
	loginController,
	userDetalisController,
	userLogoutController,
	getAlluser,
	updateUserRole,
	deleteUser
	
};
