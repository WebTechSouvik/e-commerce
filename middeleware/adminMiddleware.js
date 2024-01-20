import {User} from "../model/userModel.js"
import asyncHandler from "../utils/asynchandler.js"
import Apierror from "../utils/customerror.js"

export const isAdmin= asyncHandler(async(req,res,next)=>{
const user=await User.findById(req.user)
 
 if(user.role!="admin"){
 	throw new Apierror("only admin can acess",400)
 }

	next()

})