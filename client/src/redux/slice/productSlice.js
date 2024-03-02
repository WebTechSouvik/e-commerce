import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {getAllProduct,getSingleProduct} from "../../utilis/productApi.js"
import {filters} from "../../constant/productConstant.js"

export const getAllProductThunk=createAsyncThunk(
	"getAllProductThunk",
	async(query)=>{
		try{

		return await getAllProduct(query)
	}
	catch(err){
		throw new Error(err.response.data.message)
	}
	})


export const getSingleProductThunk=createAsyncThunk("getSingleProductThunk",async(id)=>{
 
try{
return await getSingleProduct(id)
}
catch(err){
 throw new Error(err.response.data.message)
}


})


const productSlice=createSlice({
	name:"productSlice",
	initialState:{
		loading:false,
		product:null,
		products:[],
		filterItem:[...filters],
		message:"",
		error:null

	},

reducers:{
	updateFilter:(state,action)=>{
		console.log(action.payload)
		const selectedItem=state.filterItem.find((item)=>item.id==action.payload.id)

		const updatedoption=selectedItem.options.map((option)=>{
			if(option.label==action.payload.label){
				return{...option,checked:!option.checked}
			}
			else
				return option
		})
		const updatedSelectedItem={...selectedItem,options:updatedoption}

		state.filterItem=state.filterItem.map((item)=>item.id==action.payload.id?updatedSelectedItem:item)
	}
},

extraReducers:(builder)=>{
			builder
			.addCase(getAllProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllProductThunk.fulfilled, (state, action) => {

				state.products = [...action.payload.products];
				state.message=action.payload.message
				state.loading = false;
			})
			.addCase(getAllProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getSingleProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getSingleProductThunk.fulfilled, (state, action) => {

				state.product = action.payload.product;
				state.message=action.payload.message
				state.loading = false;
			})
			.addCase(getSingleProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})

}

})

export const { updateFilter } = productSlice.actions;
export default productSlice.reducer;