import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from "../../../constants";

// action

export const createCategoryAction = createAsyncThunk(
	'category/create',
	async (category, { rejectWithValue, getState, dispatch }) => {
		// get user token from state
		const user = getState()?.users;
		const { userAuth } = user;

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		// http request
		try {
			const { data } = await axios.post(`${API_URL}/api/category`, {
				title: category?.title,
			}, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);

// slice

const categorySlices = createSlice({
	name: 'category',
	initialState: {},
	extraReducers: (builder) => {
		builder.addCase(createCategoryAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(createCategoryAction.fulfilled, (state, action) => {
			state.category = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(createCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.payload?.error;
		});
	}
});

export default categorySlices.reducer;