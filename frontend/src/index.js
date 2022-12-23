import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import { AuthIndex, AuthRoot, Login, Register } from './screens';


const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "auth",
		element: <AuthRoot />,
		children: [
			{index: true, element: <AuthIndex />},
			{
				path: "register",
				element: <Register />
			},
			{
				path: "login",
				element: <Login />
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
