import {User} from "../model/userModel.js"
import asyncHandler from "../utils/asynchandler.js"
import Apierror from "../utils/customerror.js"
import mongoose from "mongoose"

export const isAdmin= asyncHandler(async(req,res,next)=>{
    // const id=new mongoose.Types.ObjectId(req.user)
  
const user=await User.findById(req.user)
 
 if(user.role!="admin"){
 	throw new Apierror("only admin can acess",400)
 }

	next()

})