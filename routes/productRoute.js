import { Router } from "express";
import { authorization } from "../middeleware/authMiddleware.js";
import { isAdmin } from "../middeleware/adminMiddleware.js";
import {upload} from "../middeleware/multerMiddleware.js"

const router = Router();

import {
	createProduct,
	getAllProducts,
	getProduct,
	updateProduct,
	deleteProduct,
	getAdminProduct,
} from "../controller/productController.js";


router.route("/").get(getAllProducts);
router.route("/details/:Id").get(getProduct);


router.use(authorization, isAdmin);

router.route("/admin").post(upload.array("images"),createProduct).get(getAdminProduct)
router.route("/admin/:Id").put(updateProduct).delete(deleteProduct);


export default router;
