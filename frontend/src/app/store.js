import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/users/usersSlices";
import categoryReducer from "./slices/category/categorySlice";
import postReducer from "./slices/posts/postSlices";
import commentReducer from "./slices/comments/CommentSlice";

const store = configureStore({
	reducer: {
		users: usersReducer,
		category: categoryReducer,
		post: postReducer,
		comment: commentReducer,
	},
});

export default store;