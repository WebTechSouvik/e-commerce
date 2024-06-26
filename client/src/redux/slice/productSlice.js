import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	getAllProduct,
	getFeatureProduct,
	getSingleProduct,
	addReview,
} from "../../utilis/productApi.js";
import { filters } from "../../constant/productConstant.js";

export const getAllProductThunk = createAsyncThunk(
	"getAllProductThunk",
	async (query) => {
		try {
			return await getAllProduct(query);
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const getFeatureProductThunk = createAsyncThunk(
	"getFeatureProductThunk",
	async () => {
		try {
			return await getFeatureProduct();
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);
export const getSingleProductThunk = createAsyncThunk(
	"getSingleProductThunk",
	async (id) => {
		try {
			return await getSingleProduct(id);
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const addReviewThunk = createAsyncThunk(
	"addReviewThunk",
	async (apiInfo) => {
		const { id, reviewInfo } = apiInfo;

		try {
			return await addReview(id, reviewInfo);
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

const productSlice = createSlice({
	name: "productSlice",
	initialState: {
		loading: false,
		product: null,
		featureProducts: [],
		products: [],
		review:{},
		totalProductsCount: null,
		currentPage: 1,
		filter: "",
		price: [0, 100000],
		filterItem: [...filters],
		message: "",
		error: null,
	},

	reducers: {
		updateFilter: (state, action) => {
			console.log(action.payload);
			const selectedItem = state.filterItem.find(
				(item) => item.id == action.payload.id,
			);

			const updatedoption = selectedItem.options.map((option) => {
				if (option.label == action.payload.label) {
					return { ...option, checked: !option.checked };
				} else return option;
			});
			const updatedSelectedItem = {
				...selectedItem,
				options: updatedoption,
			};

			state.filterItem = state.filterItem.map((item) =>
				item.id == action.payload.id ? updatedSelectedItem : item,
			);
		},
		resetFilterItem: (state, action) => {
			state.filterItem = state.filterItem.map((item) => {
				const newOption = item.options.map((option) => {
					return { ...option, checked: false };
				});

				return { ...item, options: newOption };
			});
		},
		addFilter: (state, action) => {
			if (!state.filter) {
				state.filter = action.payload;
			} else {
				state.filter += `,${action.payload}`;
			}
		},
		removeFilter: (state, action) => {
			const filterArray = state.filter?.split(",");

			const newfilterArray = filterArray?.filter(
				(item) => item != action.payload,
			);
			if (newfilterArray?.length == 0) {
				state.filter = "";
			} else {
				state.filter = newfilterArray?.join();
			}
		},
		addNewReview: (state, action) => {
			state.review=action.payload
			
		},
		changePrice: (state, action) => {
			state.price = action.payload;
		},
		resetPage: (state) => {
			state.currentPage = 1;
		},
		resetFilter: (state) => {
			state.filter = "";
		},
		resetPrice:(state)=>{
			state.price=[0, 100000]

		},
		setPage: (state, action) => {
			state.currentPage = action.payload;
		},
		clearMessage: (state, action) => {
			state.message = null;
		},
		clearError: (state, action) => {
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getAllProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getAllProductThunk.fulfilled, (state, action) => {
				state.products = [...action.payload.products];
				state.totalProductsCount = action.payload.numberOfProducts;
				state.loading = false;
			})
			.addCase(getAllProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getFeatureProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getFeatureProductThunk.fulfilled, (state, action) => {
				state.featureProducts = [...action.payload.products];
				state.loading = false;
			})
			.addCase(getFeatureProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(getSingleProductThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(getSingleProductThunk.fulfilled, (state, action) => {
				state.product = action.payload.product;

				state.loading = false;
			})
			.addCase(getSingleProductThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(addReviewThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(addReviewThunk.fulfilled, (state, action) => {
				state.product.reviwes.push(state.review);
				state.message = action.payload.message;
				state.loading = false;
			})
			.addCase(addReviewThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			});
	},
});

export const {
	updateFilter,
	resetFilterItem,
	addFilter,
	removeFilter,
	changePrice,
	addNewReview,
	resetFilter,
	resetPage,
	resetPrice,
	setPage,
	clearMessage,
	clearError,
} = productSlice.actions;
export default productSlice.reducer;
