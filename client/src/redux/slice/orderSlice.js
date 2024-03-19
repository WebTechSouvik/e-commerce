import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {createOrder,getMyOrder,getOrderDetalis,getAllOrder} from "../../utilis/orderApi.js";

export const  createOrderThunk=createAsyncThunk("createOrderThunk",async(orderInfo)=>{
	try{
		return await createOrder(orderInfo)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
}

)

export const  getMyOrderThunk=createAsyncThunk("getMyOrderThunk",async()=>{

	try{
		return await getMyOrder()
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
}

)

export const getOrderDetalisThunk=createAsyncThunk("getOrderDetalisThunk",async(id)=>{
	try{
return await getOrderDetalis(id)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})




const orderSlice=createSlice({
name:"order",
initialState:{
	shipingInfo:localStorage.getItem('shipingInfo')?JSON.parse(localStorage.getItem('shipingInfo')):null,
	stripeClientKey:null,
	loading:false,
	orderId:null,
	userOrders:[],
	singleOrder:null,
	message:null,
	error:null
},
reducers:{
	addShippingInfo:(state,action)=>{


		state.shipingInfo=action.payload
	},
	addStripeClientKey:(state,action)=>{


		state.stripeClientKey=action.payload
	},
	changeOrderStatus:(state,action)=>{
		state.singleOrder.orderStatus=action.payload
	}
},
extraReducers: (builder) => {
		builder
			.addCase(createOrderThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(createOrderThunk.fulfilled, (state, action) => {
			
				state.orderId=action.payload.order._id
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(createOrderThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getMyOrderThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getMyOrderThunk.fulfilled, (state, action) => {
			
				state.userOrders=action.payload.userAllOrder
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(getMyOrderThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getOrderDetalisThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getOrderDetalisThunk.fulfilled, (state, action) => {
			
				state.singleOrder=action.payload.order
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(getOrderDetalisThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			


}

})

export const { addShippingInfo,addStripeClientKey,changeOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;