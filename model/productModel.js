import mongoose from "mongoose"

const productSchema= new mongoose.Schema({
	name:{
		type:String,
		required:[true,"product name is requirid"],
		unique:[true,"product name should be unique"]
	},
	description:{
		type:String,
		required:[true,"product description is requried"]
	},
	price:{
		type:Number,
		required:[true,"price is requirid"]
	},

	catagory:{
		type:String,
		required:[true,"catagory shouild be included"]
	},
	avgRating:{
		type:Number,
		default:0
	},
	 images:[ {
		public_id:{
			type: String,
		},
		url:{
			type: String,
		}
		
	}
	 ],
	 stock:{
	 	type:Number,
	 	default:1
	 }
,
	 reviwes:[
	 {
	 	owner:{
	 		type:mongoose.Schema.Types.ObjectId,
	 		ref:"User"
	 	},

		rating:{
			type:Number,
			required:[true,"give rating for reviwe"]
		},

	 	description:{
	 		type:String,
	 		required:[true,"write description for reviwe"]
	 	}
	 }
	 ]

})

export const Product=mongoose.model("Product",productSchema)