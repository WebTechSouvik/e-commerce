import { Router } from "express";
import {
	registerController,
	loginController,
	userDetalisController,
	userLogoutController,
	getAlluser,
	updateUserRole,
	deleteUser,
} from "../controller/userController.js";
import { authorization } from "../middeleware/authMiddleware.js";
import { isAdmin } from "../middeleware/adminMiddleware.js";
import { upload } from "../middeleware/multerMiddleware.js";

const router = Router();

router.route("/register").post(upload.single("file"), registerController);
router.route("/login").post(loginController);

router.use(authorization)

router.route("/detalis").get(userDetalisController);
router.route("/logout").post(userLogoutController);

router.use(isAdmin)

router.route("/admin").get(getAlluser)
router.route("/admin/:Id").put(updateUserRole).delete(deleteUser)

export default router;
