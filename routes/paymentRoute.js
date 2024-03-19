import { Router } from "express";
import { authorization } from "../middeleware/authMiddleware.js";

import {createCheckoutSession} from "../controller/paymentController.js"

const router=Router();

router.use(authorization)
router.route("/create-checkout-session").post(createCheckoutSession)

export default router