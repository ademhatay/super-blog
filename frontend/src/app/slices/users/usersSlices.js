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

// login user action
export const loginUserAction = createAsyncThunk(
	'user/login',
	async (user, { rejectWithValue, getState, dispatch }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const { data } = await axios.post(`${API_URL}/api/users/login`, user, config);

			// set data to local storage
			localStorage.setItem('userInfo', JSON.stringify(data));
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
);


// logout user action
export const logoutUserAction = createAsyncThunk(
	'user/logout',
	async (payload, { rejectWithValue, getState, dispatch }) => {
		try {
			localStorage.removeItem('userInfo');
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error.response.data);
		}
	}
)


// Profile
export const userProfileAction = createAsyncThunk(
	"user/profile",
	async (id, { rejectWithValue, getState, dispatch }) => {
		//get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		//http call
		try {
			const { data } = await axios.get(
				`${API_URL}/api/users/profile/${id}`,
				config
			);
			return data;
		} catch (error) {
			if (!error?.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

//Update action
export const updateUserAction = createAsyncThunk(
	"users/update",
	async (userData, { rejectWithValue, getState, dispatch }) => {
		//get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		//http call
		try {
			const { data } = await axios.put(
				`${API_URL}/api/users`,
				{
					lastName: userData?.lastName,
					firstName: userData?.firstName,
					bio: userData?.bio,
					email: userData?.email,
				},
				config
			);
			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			return rejectWithValue(error?.response?.data);
		}
	}
);

//fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
	"user/detail",
	async (id, { rejectWithValue, getState, dispatch }) => {
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			const { data } = await axios.get(`${API_URL}/api/users/${id}`, config);
			return data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);


//Upload Profile Photo
export const uploadProfilePhotoAction = createAsyncThunk(
	"user/profile-photo",
	async (userImg, { rejectWithValue, getState, dispatch }) => {
		//get user token
		const user = getState()?.users;
		const { userAuth } = user;
		const config = {
			headers: {
				Authorization: `Bearer ${userAuth?.token}`,
			},
		};
		try {
			//http call
			const formData = new FormData();

			formData.append("image", userImg?.image);

			const { data } = await axios.put(
				`${API_URL}/api/users/profilePhoto-upload`,
				formData,
				config
			);
			// save new photo to local storage
			localStorage.setItem(
				"userInfo",
				JSON.stringify({ ...userAuth, profilePhoto: data?.photo })
			);
			console.log(data);
			return data;
		} catch (error) {
			if (!error?.response) throw error;
			return rejectWithValue(error?.response?.data);
		}
	}
);



// if user is logged in, get user info from local storage else set to null
const userLoginFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

//slices
const usersSlices = createSlice({
	name: "users",
	initialState: {
		userAuth: userLoginFromStorage,
	},
	extraReducers: builder => {
		//register
		builder.addCase(registerUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(registerUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.registered = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(registerUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//login
		builder.addCase(loginUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(loginUserAction.fulfilled, (state, action) => {
			state.userAuth = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(loginUserAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});

		// logout
		builder.addCase(logoutUserAction.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(logoutUserAction.fulfilled, (state, action) => {
			state.userAuth = null;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(logoutUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		//user details
		builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
			state.loading = false;
			state.userDetails = action?.payload;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});
		//Profile
		builder.addCase(userProfileAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(userProfileAction.fulfilled, (state, action) => {
			state.profile = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(userProfileAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});

		//update
		builder.addCase(updateUserAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
		});
		builder.addCase(updateUserAction.fulfilled, (state, action) => {
			state.loading = false;
			state.userUpdated = action?.payload;
			state.isUpdated = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(updateUserAction.rejected, (state, action) => {
			state.loading = false;
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
		});

		//Upload Profile photo
		builder.addCase(uploadProfilePhotoAction.pending, (state, action) => {
			state.loading = true;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
			state.profilePhoto = action?.payload;
			state.loading = false;
			state.appErr = undefined;
			state.serverErr = undefined;
		});
		builder.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
			state.appErr = action?.payload?.message;
			state.serverErr = action?.error?.message;
			state.loading = false;
		});

	},
});

export default usersSlices.reducer;