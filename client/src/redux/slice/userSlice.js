import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	userLogin,
	userDetalis,
	userRegister,
	userLogout,
} from "../../utilis/userAuthApi.js";

export const userLoginThunk = createAsyncThunk(
	"userLoginThunk",
	async (loginInfo) => {
		try {
			return await userLogin(loginInfo);
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const userDetalisThunk = createAsyncThunk(
	"userDetalisThunk",

	async () => {
		try {
			return await userDetalis();
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const userRegisterThunk = createAsyncThunk(
	"userRegisterThunk",
	async (loginInfo) => {
		try {
			return await userRegister(loginInfo);
		} catch (err) {
			throw new Error(err.response.data.message);
		}
	},
);

export const userLogoutThunk = createAsyncThunk("userLogoutThunk", async () => {
	return await userLogout();
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		message:null,
		user: null,
		isAuthinticated: false,
		error: null,
	},
	reducers:{
		clearError:(state,action)=>{
			state.error=null
		},
		clearMessage:(state,action)=>{
			state.message=null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLoginThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(userLoginThunk.fulfilled, (state, action) => {
				state.isAuthinticated = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(userLoginThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(userDetalisThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(userDetalisThunk.fulfilled, (state, action) => {
				state.user = action.payload.user;
				state.isAuthinticated = true;
				state.loading = false;
				state.error = null;
			})
			.addCase(userDetalisThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(userRegisterThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(userRegisterThunk.fulfilled, (state, action) => {
			
				state.message=action.payload.message
				
				state.loading = false;
				state.error = null;
			})
			.addCase(userRegisterThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			})
			.addCase(userLogoutThunk.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(userLogoutThunk.fulfilled, (state, action) => {
				state.user = null;
				state.isAuthinticated = false;
				state.loading = false;
				state.error = null;
			})
			.addCase(userLogoutThunk.rejected, (state, action) => {
				state.error = action.error;
				state.loading = false;
			});
	},
});
export const {clearError,clearMessage } = userSlice.actions;
export default userSlice.reducer;
