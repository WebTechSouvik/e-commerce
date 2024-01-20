import { Product } from "../model/productModel.js";
import asyncHandler from "../utils/asynchandler.js";
import Apierror from "../utils/customerror.js";

export const createProduct = asyncHandler(async (req, res) => {
	const product = await Product.create(req.body);

	res.status(201).json({
		message: "product create succesfully",
		status: "sucess",
		product,
	});
});

export const getAllProducts = asyncHandler(async (req, res) => {
	const { query, page, limit, catagory, price } = req.query;
	console.log(req.query.price);

	const filter = {};

	if (query) {
		filter.name = { $regex: new RegExp(query, "i") };
	}

	if (catagory) {
		filter.catagory = catagory;
	}

	if (price) {
		const stringOfPrice = JSON.stringify(price);

		const newString = stringOfPrice.replace(
			/(gt|gte|lt|lte)/g,
			(e) => `$${e}`,
		);

		const newPrice = JSON.parse(newString);

		filter.price = { ...newPrice };
	}

	const option = {
		limit,
		skip: (page - 1) * limit,
	};

	const products = await Product.find(filter, null, option);
	if (products.length == 0) {
		throw new Apierror("any products not found", 400);
	}
	res.status(201).json({
		status: "sucess",
		message: "all prodects feth succesfully",
		products,
	});
});

export const getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.Id);

	if (!product) {
		throw new Apierror("invalid productId", 400);
	}
	res.status(201).json({
		status: "sucess",
		message: "product found sucessfully",
		product,
	});
});

export const updateProduct = asyncHandler(async (req, res) => {
	const newProduct = await Product.findByIdAndUpdate(
		req.params.Id,
		req.body,
		{ new: true },
	);

	if (!newProduct) {
		throw new Apierror(
			"product not found and upadte opration unsuccessful",
		);
	}

	res.status(201).json({
		status: "sucess",
		message: "product update sucessfully",
		newProduct,
	});
});

export const deleteProduct = asyncHandler(async (req, res) => {
	const removeProduct = await Product.findByIdAndDelete(req.params.Id);
	if (!removeProduct) {
		throw new Apierror("delete opration unsuccessful,check prodct Id", 400);
	}

	res.status(201).json({
		status: "sucess",
		message: "product delete sucessfully",
		removeProduct,
	});
});
