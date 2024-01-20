import { Router } from "express";
import { authorization } from "../middeleware/authMiddleware.js";
import { isAdmin } from "../middeleware/adminMiddleware.js";

import {
	createOrder,
	getSingleOrder,
	userOrders,
	getAllorder,
	updateOrder,
	deleteOrder,
} from "../controller/orderController.js";

const router = Router();
router.use(authorization);
router.route("/").post(createOrder).get(isAdmin, getAllorder);
router.route("/user").get(userOrders);
router
	.route("/:Id")
	.get(isAdmin, getSingleOrder)
	.put(isAdmin, updateOrder)
	.delete(isAdmin, deleteOrder);

export default router;
