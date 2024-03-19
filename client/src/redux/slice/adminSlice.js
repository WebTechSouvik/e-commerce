import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAdminProduct,createProduct,updateProduct,deleteProduct,getAllOrder,updateOrder,deleteOrder,getAllUser,deleteUser} from "../../utilis/adminApi.js"


export const getAdminProductThunk=createAsyncThunk("getAdminProductThunk",async()=>{

	try{
		return await getAdminProduct()
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})


export const createproductThunk=createAsyncThunk("createproductThunk",async(productInfo)=>{
	try{
		return await createProduct(productInfo)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})

export const updateProductThunk=createAsyncThunk("updateProductThunk",async(apiInfo)=>{
	const{id,productInfo}=apiInfo
	try{
		return await updateProduct(id,productInfo)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})

export const deleteProductThunk=createAsyncThunk("deleteProductThunk",async(productId)=>{

	try{
		return await deleteProduct(productId)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})


export const getAllOrderThunk=createAsyncThunk("getAllOrderThunk",async()=>{

	try{
		return await getAllOrder()
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})


export const updateOrderThunk=createAsyncThunk("updateOrderThunk",async(apiInfo)=>{
	const {orderId,orderStatus}=apiInfo
	try{
return await updateOrder(orderId,orderStatus)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})

export const deleteOrderThunk=createAsyncThunk("deleteOrderThunk",async(orderId)=>{

	try{
return await deleteOrder(orderId)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})


export const getAllUserThunk=createAsyncThunk("getAllUserThunk",async()=>{

	try{
		return await getAllUser()
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})

export const deleteUserThunk=createAsyncThunk("deleteUserThunk",async(userId)=>{
	console.log("hi")
	try{
		return await deleteUser(userId)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
})


const adminSlice=createSlice({
name:"adminSlice",
initialState:{
	loading:false,
	products:[],
	product:null,
	allOrders:[],
	users:[],
	message:null,
	error:null
},
reducers:{
deleteOrderItem:(state,action)=>{
	state.allOrders=state.allOrders.filter((order)=>order._id!=action.payload)
},
deleteProductItem:(state,action)=>{
	state.products=state.products.filter((product)=>product._id!=action.payload)
},
deleteUserItem:(state,action)=>{
	state.users=state.users.filter((user)=>user._id!=action.payload)
},
clearError:(state,action)=>{
	state.error=null
},
clearMessage:(state,action)=>{
	state.message=null
}
},
extraReducers: (builder) => {
		builder
			.addCase(getAdminProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAdminProductThunk.fulfilled, (state, action) => {
				state.products=action.payload.products
				state.loading = false;
			})
			.addCase(getAdminProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(updateProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(updateProductThunk.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(updateProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(createproductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(createproductThunk.fulfilled, (state, action) => {
				state.products=[...state.products,action.payload.product]
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(createproductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(deleteProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteProductThunk.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(deleteProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getAllOrderThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllOrderThunk.fulfilled, (state, action) => {
			
				state.allOrders=action.payload.allorders
				state.loading = false;
			})
			.addCase(getAllOrderThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(updateOrderThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(updateOrderThunk.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(updateOrderThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})

			.addCase(deleteOrderThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteOrderThunk.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(deleteOrderThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getAllUserThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllUserThunk.fulfilled, (state, action) => {
				state.users=action.payload.users
				state.loading = false;
			})
			.addCase(getAllUserThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(deleteUserThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteUserThunk.fulfilled, (state, action) => {
				state.message=action.payload.message
				state.loading = false;
			})
			.addCase(deleteUserThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})




}

})
export const {deleteOrderItem,deleteProductItem,deleteUserItem,clearMessage,clearError } = adminSlice.actions;
export default adminSlice.reducer;