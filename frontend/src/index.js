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
import { AuthIndex, AuthRoot, Login, Dashboard, Register } from './screens';


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
			}
		]
	},
	{
		path: "dashboard",
		element: <Dashboard />
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
