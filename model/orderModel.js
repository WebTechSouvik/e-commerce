import mongoose from "mongoose"


const orderSchema=new mongoose.Schema({

shipingInfo:{
			address:{
				type:String,
				required:[true,"address is requried"]
			},
			city:{
				type:String,
			required:[true,"city is requried"]
				
			},
			pincode:{
				type:String,
			required:[true,"pincode is requried"]
				
			},
			country:{
				type:String,
			required:[true,"country name is requried"]
				
			},
			state:{
			type:String,
			required:[true,"state name is requried"]
				
			},
		
			phoneNumber:{
				type:Number,
			required:[true,"phoneNumber is requried"]
				
			}

},
orderItems:[{
			product:{
				type:mongoose.Schema.Types.ObjectId,
				ref:"Product",
				required:[true,"product is requried for placing order"]
			},

			quantity:{
				type:Number,
				default:1
			},

			price:{
				type:Number,
				required:[true,"total price is requried for each product"]
			}
}],

customer:{
	type:mongoose.Schema.Types.ObjectId,
	ref:"User"
},
orderStatus:{
	type:String,
	default:"processing"
},
taxprice:{
	type:Number,

},
shippingPrice:{
	type:Number
}
,
totalPrice:{
	type:Number,
	required:[true,"total price is requried for all product"]
}

})


export const Order=mongoose.model("Order",orderSchema)