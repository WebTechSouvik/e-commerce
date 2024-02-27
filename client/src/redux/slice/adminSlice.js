import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAdminProduct,createProduct} from "../../utilis/adminApi.js"


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

const adminSlice=createSlice({
name:"adminSlice",
initialState:{
	loading:false,
	products:[],
	error:null
},

extraReducers: (builder) => {
		builder
			.addCase(getAdminProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAdminProductThunk.fulfilled, (state, action) => {
				state.products=action.payload.products
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(getAdminProductThunk.rejected, (state, action) => {
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

}

})

export default adminSlice.reducer;