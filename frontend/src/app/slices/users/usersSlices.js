import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../constants";

// register user action

export const registerUserAction = createAsyncThunk(
	'users/register',
	async (user, { rejectWithValue, getState, dispatch }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(`${API_URL}/api/users/register`, user, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);

// register user slice

const registerUserSlice = createSlice({
	name: 'users/register',
	initialState: {
		user: null,
		loading: false,
		appError: undefined,
		serverError: undefined,
		registered: false,
	},
	extraReducers: (builder) => {
		builder.addCase(registerUserAction.pending, (state) => {
			state.loading = true;
			state.user = null;
			state.appError = undefined;
			state.serverError = undefined;
			state.registered = false;
		});
		builder.addCase(registerUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action?.payload;
			state.appError = undefined;
			state.serverError = undefined;
			state.registered = true;
		});
		builder.addCase(registerUserAction.rejected, (state, action) => {
			state.loading = false;
			state.user = null;
			state.appError = action?.payload?.message;
			state.serverError = action?.error?.message;
			state.registered = false;
		});
	},
});

export default registerUserSlice.reducer;