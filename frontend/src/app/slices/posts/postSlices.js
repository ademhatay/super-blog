import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../../constants';


// create Post Action
export const createPostAction = createAsyncThunk(
	'post/create',
	async (post, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${userAuth.token}`,
			},
		};
		// call API
		try {
			const formData = new FormData();
			formData.append('image', post?.image);
			formData.append('title', post?.title);
			formData.append('description', post?.description);
			formData.append('category', post?.category);
			const { data } = await axios.post(`${API_URL}/api/posts`, formData, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		};
	}
);


// slice

const postSlice = createSlice({
	name: 'post',
	initialState: {

	},
	extraReducers: (builder) => {
		builder.addCase(createPostAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(createPostAction.fulfilled, (state, action) => {
			state.postCreated = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(createPostAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});
	}
});


export default postSlice.reducer;