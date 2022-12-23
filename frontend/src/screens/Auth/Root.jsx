import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
	return <>
		<div className='w-screen h-auto lg:h-screen flex flex-col lg:flex-row'>
			<div className='w-full lg:w-1/2 h-full border-b-4 lg:border-r-4 text-center flex flex-col justify-evenly py-6 lg:py-0 bg-gray-100'>
				<h1 className='text-5xl font-semibold mb-5 lg:mb-0'>Super Blog</h1>
				<p>
					Multi Features MERN Blog App <br /> if you want more feature you must login
				</p>
				<div>
					<h2 className='text-3xl mb-2'>Features</h2>
					<ul>
						<li>Register / Login</li>
						<li>Account Verify Email</li>
						<li>Forgot Password</li>
						<li>Admin, Guest, Writer</li>
						<li>Like - Dislike</li>
						<li>Comment</li>
						<li>View of Post</li>
						<li>JWT</li>
						<li>MongoDB</li>
						<li>Redux Toolkit</li>
						<li>... More</li>
					</ul>
				</div>
			</div>
			<Outlet />
		</div>
	</>
}

export default Root