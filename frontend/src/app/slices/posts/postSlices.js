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

// fetch ALl Posts Action
export const fetchAllPostsAction = createAsyncThunk(
	'post/fetchAll',
	async (post, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userAuth.token}`,
			},
		};
		// call API
		try {
			const { data } = await axios.get(`${API_URL}/api/posts`, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		};
	}
);

// get Post By Id Action 
export const getPostByIdAction = createAsyncThunk(
	'post/getById',
	async (postId, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userAuth.token}`,
			},
		};
		// call API
		try {
			const { data } = await axios.get(`${API_URL}/api/posts/${postId}`, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		};
	}
);

// postLikeAction
export const postLikeAction = createAsyncThunk(
	'post/like',
	async (postId, { rejectWithValue, getState, dispatch }) => {
		// get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userAuth.token}`,
			},
		};
		// call API
		try {
			const { data } = await axios.put(`${API_URL}/api/posts/likes`, { postId }, config);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		};
	}
);

export const toggleAddDisLikesToPost = createAsyncThunk(
	"post/dislike",
	async (postId, { rejectWithValue, getState, dispatch }) => {
		//get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.put(
				`${API_URL}/api/posts/dislikes`,
				{ postId },
				config
			);

			return data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);


//Update
export const updatePostAction = createAsyncThunk(
	"post/updated",
	async (post, { rejectWithValue, getState, dispatch }) => {
		//get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			//http call
			const { data } = await axios.put(
				`${API_URL}/api/posts/${post?.id}`,
				post,
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);

//Delete
export const deletePostAction = createAsyncThunk(
	"post/delete",
	async (postId, { rejectWithValue, getState, dispatch }) => {
		//get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			//http call
			const { data } = await axios.delete(
				`${API_URL}/api/posts/${postId}`,
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
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

		// fetch all posts
		builder.addCase(fetchAllPostsAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchAllPostsAction.fulfilled, (state, action) => {
			state.allPosts = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchAllPostsAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});

		// get post by id
		builder.addCase(getPostByIdAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getPostByIdAction.fulfilled, (state, action) => {
			state.post = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(getPostByIdAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});

		// post like

		builder.addCase(postLikeAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(postLikeAction.fulfilled, (state, action) => {
			state.post = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(postLikeAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});
		builder.addCase(toggleAddDisLikesToPost.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(toggleAddDisLikesToPost.fulfilled, (state, action) => {
			state.post = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(toggleAddDisLikesToPost.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//Update post
		builder.addCase(updatePostAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updatePostAction.fulfilled, (state, action) => {
			state.postUpdated = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updatePostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//Delete post
		builder.addCase(deletePostAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deletePostAction.fulfilled, (state, action) => {
			state.postUpdated = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(deletePostAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

	}
});


export default postSlice.reducer;