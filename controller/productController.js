import { Product } from "../model/productModel.js";
import asyncHandler from "../utils/asynchandler.js";
import Apierror from "../utils/customerror.js";
import { uploadCloudinary } from "../utils/uploadCloudinary.js";
import { v2 as cloudinary } from "cloudinary"


// create product by admin

export const createProduct = asyncHandler(async (req, res) => {
	console.log(req.body);
	let imageArray;
	if (req.files) {
		imageArray = await Promise.all(
			req.files.map(async (file) => await uploadCloudinary(file.path)),
		);
	}

	const product = await Product.create({
		...req.body,
		images: imageArray.map((image) => ({
			public_id: image.public_id,
			url: image.secure_url,
		})),
	});

	res.status(201).json({
		message: "product create succesfully",
		status: "sucess",
		product,
	});
});

//get all products for user based filter

export const getAllProducts = asyncHandler(async (req, res) => {
	const { query, page, limit, catagory, price } = req.query;

	const filter = {};

	if (query) {
		filter.name = { $regex: new RegExp(query, "i") };
	}

	if (catagory) {
		// 	if(typeof catagory=="object")
		// 	filter.catagory = {$in:[...catagory]}
		// else
		// 	filter.catagory = {$in:[catagory]}
		const catagoryFilter = catagory.split(",");
		filter.catagory = { $in: [...catagoryFilter] };
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

	const allProducts = await Product.find(filter);

	if (allProducts.length == 0) {
		throw new Apierror("any products not found", 400);
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
		numberOfProducts: allProducts.length,
	});
});


// get all products for admin without filter

export const getAdminProduct = asyncHandler(async (req, res) => {
	const products = await Product.find();

	res.status(201).json({
		status: "sucess",
		products,
		message: "all produts fetch sucessfully",
	});
});

// get details for a product

export const getProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.Id).populate({
		path: "reviwes.owner",
		select: ["fullname", "avtar.url"],
	});

	if (!product) {
		throw new Apierror("invalid productId", 400);
	}
	res.status(201).json({
		status: "sucess",
		message: "product found sucessfully",
		product,
	});
});


// update product info by admin

export const updateProduct = asyncHandler(async (req, res) => {
	console.log(req.body);
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

//delete product by admin

export const deleteProduct = asyncHandler(async (req, res) => {
	const removeProduct = await Product.findByIdAndDelete(req.params.Id);
	if (!removeProduct) {
		throw new Apierror("delete opration unsuccessful,check prodct Id", 400);
	}


removeProduct.images.forEach(async(image)=>await cloudinary.uploader.destroy(image.public_id))


	res.status(201).json({
		status: "sucess",
		message: "product delete sucessfully",
		removeProduct,
	});
});

//add review for a product

export const addReview = asyncHandler(async (req, res) => {
	const { rating, description } = req.body;
	const { Id: productId } = req.params;
	const id = req.user;

	const product = await Product.findById(productId);

	const isReview = product.reviwes.find((review) => review.owner == id);
	console.log(id);

	if (isReview) {
		throw new Apierror("you already review this item",400);
	}

	product.reviwes.push({ owner: id, rating, description });

	const totalRating = product.reviwes.reduce(
		(accu, review) => accu + review.rating,
		0,
	);

	product.avgRating = totalRating / product.reviwes.length;

	await product.save({ validateBeforeSave: false });

	return res
		.status(200)
		.json({ status: "success", message: "review added successful" });
});
