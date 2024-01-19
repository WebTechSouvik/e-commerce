import {Router} from "express"
import{registerController,loginController} from "../controller/userController.js"
import {authorization} from "../middeleware/authMiddleware.js"

const router=Router()


router.route("/register").post(registerController)
router.route("/login").post(loginController)

router.route("/test").get(authorization,(req,res)=>{
	return res.status(200).json({message:"sucess"})
})
export default router