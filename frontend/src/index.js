import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import store from "./app/store";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { AuthIndex, AuthRoot, Login, Dashboard, Register, Logout, Admin, LivePosts, Stats, CreateCategory, ChooseTopic, ManageUsers, ManagePosts, ManageComments, PublicCategory } from './screens';


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "auth",
		element: <AuthRoot />,
		children: [
			{ index: true, element: <AuthIndex /> },
			{
				path: "register",
				element: <Register />
			},
			{
				path: "login",
				element: <Login />
			},
			{
				path: "logout",
				element: <Logout />
			}
		]
	},
	{
		path: "dashboard",
		element: <Dashboard />,
	},
	{
		path: 'admin',
		element: <Admin />,
		children: [
			{index: true, element: <Stats />},
			{
				path: 'create-category',
				element: <CreateCategory />
			},
			{
				path: 'choose-topic',
				element: <ChooseTopic />
			},
			{
				path: 'manage-users',
				element: <ManageUsers />
			},
			{
				path: 'manage-posts',
				element: <ManagePosts />
			},
			{
				path: 'manage-comments',
				element: <ManageComments />
			},
		]
	},
	{
		path: 'live-posts',
		element: <LivePosts />,
	},
	{
		path: 'create-category',
		element: <PublicCategory />
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
