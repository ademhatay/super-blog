import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from '../App';

import { AuthIndex, AuthRoot, Login, Dashboard, Register, Logout, Admin, LivePosts, Stats, CreateCategory, ChooseTopic, ManageUsers, ManagePosts, ManageComments, PublicCategoryList, PublicCategory, PublicUpdateCategory, ManageCategory, PublicPost } from '../screens';


const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />} />
			<Route path="auth" element={<AuthRoot />}>
				<Route index element={<AuthIndex />} />
				<Route path="register" element={<Register />} />
				<Route path="login" element={<Login />} />
				<Route path="logout" element={<Logout />} />
			</Route>
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="admin" element={<Admin />}>
				<Route index element={<Stats />} />
				<Route path="create-category" element={<CreateCategory />} />
				<Route path="choose-topic" element={<ChooseTopic />} />
				<Route path="manage-users" element={<ManageUsers />} />
				<Route path="manage-category" element={<ManageCategory />} />
				<Route path="manage-posts" element={<ManagePosts />} />
				<Route path="manage-comments" element={<ManageComments />} />
			</Route>
			<Route path="live-posts" element={<LivePosts />} />
			<Route path="live-categories" element={<PublicCategoryList />} />
			<Route path="create-category" element={<PublicCategory />} />
			<Route path="create-post" element={<PublicPost />} />
			<Route path="category-update/:id" element={<PublicUpdateCategory />} />
		</>

	)
);

export default router;