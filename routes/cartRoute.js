import {Router } from 'express'
import { authorization } from "../middeleware/authMiddleware.js";
import {addcartController,getCartController,deleteItemController} from "../controller/cartController.js"


const router =Router()
router.use(authorization)
router.route("/").post(addcartController).get(getCartController)
router.route("/:productId").delete(deleteItemController)

export default router