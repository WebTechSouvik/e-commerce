import { Cart } from "../model/cartModel.js";
import asyncHandler from "../utils/asynchandler.js";
import Apierror from "../utils/customerror.js";

export const addcartController = asyncHandler(async (req, res) => {
	const id = req.user;
	const { productId, quantity } = req.body;
	

	const cart = await Cart.findOne({ owner: id });

	if (!cart) {
		await Cart.create({ owner: id, cartItems: [{ product: productId ,quantity}] });

		res.status(201).json({
			status: "sucess",
			message: "cart created succesfully",
		});
	} else {
		const isPresent = cart.cartItems.some(
			(item) => item.product == productId,
		);

		if (isPresent) {
			throw new Apierror("item alredey presnt", 400);
		}

		cart.cartItems.push({ product:productId,quantity});
		await cart.save();

		res.status(200).json({
			status: "sucess",
			message: "item add to cart succesfully",
		});
	}
});

export const getCartController = asyncHandler(async (req, res) => {
	const allItems = await Cart.findOne({ owner: req.user }).populate({
		path: "cartItems.product",
		select: "-reviwes",
	}).select("-owner");
	// todo handel when cart is not created by user
	return res.status(200).json({
		status: "sucess",
		allItems:allItems.cartItems,
		message: "all items from cart fetch sucessfully",
	});
});

export const deleteItemController = asyncHandler(async (req, res) => {
	const cart = await Cart.findOne({ owner: req.user });
	if (!cart) {
		throw new Apierror("cart not availabele");
	}
	//todo check the item is present or not which will be deleted
	cart.cartItems.pull({ product: req.params.productId });
	await cart.save();

	return res
		.status(200)
		.json({ status: "sucess", message: "item remove from cart" });
});

// todo create udadte count controller