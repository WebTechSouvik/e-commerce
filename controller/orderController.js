import { Order } from "../model/orderModel.js";
import asyncHandler from "../utils/asynchandler.js";
import Apierror from "../utils/customerror.js";
import mongoose from "mongoose";
export const createOrder = asyncHandler(async (req, res) => {
	const order = await Order.create({ ...req.body, customer: req.user });

	res.status(201).json({
		status: "sucess",
		message: "order crated sucessfully",
		order,
	});
});

export const getSingleOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.Id)
		.populate("orderItems.product", ["name", "price"])
		.populate("customer", ["fullname", "username"]);

	if (!order) {
		throw new Apierror("order not found", 404);
	}
	res.status(201).json({
		status: "sucess",
		message: "order found sucessfully",
		order,
	});
});

export const userOrders = asyncHandler(async (req, res) => {
	

	const userAllOrder = await Order.find({
		customer: new mongoose.Types.ObjectId(req.user),
	})
		.populate("orderItems.product", ["name", "price"])
		.populate("customer", ["fullname", "username"]);

	if (userAllOrder.length == 0) {
		throw new Apierror("not found any order of this user id", 401);
	}

	res.status(201).json({
		status: "sucess",
		message: "all oreder found sucessfully",
		userAllOrder,
	});
});


export const getAllorder=asyncHandler(async(req,res)=>{

	const allorders=await Order.find()
		.populate("orderItems.product", ["name", "price"])
		.populate("customer", ["fullname", "username"])

	res.status(201).json({status:"sucess",message:"all order feth sucessfully",allorders})

})

export const updateOrder=asyncHandler(async(req,res)=>{
	const upadtedOrder=await Order.findByIdAndUpdate(req.params.Id,req.body,{new:true})

	if(!upadtedOrder){
		throw new Apierror("order didn't upadte ,check order id",401)
	}


res.status(201).json({status:"sucess",message:"order updated sucessfully",upadtedOrder})
})

export const deleteOrder=asyncHandler(async(req,res)=>{

	const removeProduct=await Order.findByIdAndDelete(req.params.Id)

	res.status(201).json({status:"sucess",message:"product deleted sucessfully"})

})