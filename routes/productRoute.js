import {Router} from "express"

const router=Router()


import {createProduct,getAllProducts,getProduct,updateProduct,deleteProduct} from "../controller/productController.js"

router.route("/")
.post(createProduct)
.get(getAllProducts)

router.route("/:Id")
.get(getProduct)
.put(updateProduct)
.delete(deleteProduct)
export default router