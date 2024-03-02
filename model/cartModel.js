import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "user must be login"],
		},

		cartItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				quantity: {
					type: Number,
					default:1,
					required:true
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

export const Cart = mongoose.model("Cart", cartSchema);
