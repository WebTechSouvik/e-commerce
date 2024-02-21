import {Router} from "express"
import{registerController,loginController,userDetalisController,userLogoutController} from "../controller/userController.js"
import {authorization} from "../middeleware/authMiddleware.js"
import {upload} from "../middeleware/multerMiddleware.js"

const router=Router()


router.route("/register").post(upload.single("file"),registerController)
router.route("/login").post(loginController)

router.route("/detalis").get(authorization,userDetalisController)
router.route("/logout").post(authorization,userLogoutController)
export default router