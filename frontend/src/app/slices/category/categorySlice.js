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



export const fetchCategoryAction = createAsyncThunk(
	'category/fetch',
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
			const { data } = await axios.get(`${API_URL}/api/category`, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateCategoryAction = createAsyncThunk(
	'category/update',
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
			const { data } = await axios.put(`${API_URL}/api/category/${category?.id}`,
				{
					title: category?.title,
				},config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteCategoryAction = createAsyncThunk(
	'category/delete',
	async (id, { rejectWithValue, getState, dispatch }) => {
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
			const { data } = await axios.delete(`${API_URL}/api/category/${id}`, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);



export const fetchSingleCategoryAction = createAsyncThunk(
	'category/details',
	async (id, { rejectWithValue, getState, dispatch }) => {
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
			const { data } = await axios.get(`${API_URL}/api/category/${id}`, config);
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
		// create category
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

		// fetch category

		builder.addCase(fetchCategoryAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
			state.categoryList = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.payload?.error;
		});

		// update category

		builder.addCase(updateCategoryAction.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(updateCategoryAction.fulfilled, (state, action) => {
			state.updateCategory = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(updateCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.payload?.error;
		});

		// delete category

		builder.addCase(deleteCategoryAction.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
			state.deletedCategory = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(deleteCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.payload?.error;
		});

		// fetch single category

		builder.addCase(fetchSingleCategoryAction.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(fetchSingleCategoryAction.fulfilled, (state, action) => {
			state.singleCategory = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});

		builder.addCase(fetchSingleCategoryAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.payload?.error;
		});
	}
});

export default categorySlices.reducer;