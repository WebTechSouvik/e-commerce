import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	addToACart,
	getAllItems,
	deleteFromCart,
} from "../../utilis/cartApi.js";

export const addToCartThunk = createAsyncThunk(
	"addToCartThunk",
	async (value) => {
		console.log(value.productId)
			const {productId,quantity}=value
		try {
			return await addToACart(productId, quantity);
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getAllItemsThunk = createAsyncThunk(
	"getAllItemsThunk",
	async () => {
		try {
			return await getAllItems();
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);
export const deleteItemsThunk = createAsyncThunk(
	"deleteItemsThunk",
	async (productId) => {
		try {
			return await deleteFromCart(productId);
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);
const cartSlice = createSlice({
	name: "cart",
	initialState: {
		loading: false,
		cartItems: [],
		message: "",
		error: null,
	},
	reducers: {
		addToCart: (state, action) => {
			// 	state.cartItems=[...state.cartItems,action.payload]
			// }
			state.cartItems.push(action.payload);
		},
		deleteItem: (state, action) => {
			console.log(action.payload)
			const newCart = state.cartItems.filter(
				(item) => item.product._id != action.payload,
			);
			state.cartItems = [...newCart];
		},
		updateQuantity:(state,action)=>{

			const upadateCart=state.cartItems.map((item)=>{

				if(item.product._id==action.payload.productId)
					return{...item,quantity:action.payload.quantity}
				else
					return item
			})
			state.cartItems=[...upadateCart]


		},
		clearMessage:(state,action)=>{
			state.message=null
		},
		clearError:(state,action)=>{
		state.error=null
	}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(addToCartThunk.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(addToCartThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getAllItemsThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllItemsThunk.fulfilled, (state, action) => {
				state.cartItems = [...action.payload.allItems];
				
				state.loading = false;
			})
			.addCase(getAllItemsThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(deleteItemsThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(deleteItemsThunk.fulfilled, (state, action) => {
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(deleteItemsThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			});
	},
});

export const { addToCart,deleteItem,updateQuantity,clearMessage,clearError } = cartSlice.actions;
export default cartSlice.reducer;
