import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
	return <>
		<div className='w-screen h-auto lg:h-screen flex flex-col lg:flex-row'>
			<div className='w-full lg:w-1/2 h-full border-b-4 lg:border-r-4 text-center flex flex-col justify-evenly py-6 lg:py-0 bg-gray-100'>
				<Link to="/" className='text-5xl font-semibold mb-5 lg:mb-0 underline'>Super Blog</Link>
				<div className='w-10/12 flex flex-col mx-auto'>
					<div className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg my-1'> Multi Features MERN Blog App</div> 
					<br />
					<div className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg my-1'>if you want more feature you must login</div>
				</div>
				<div>
					<h2 className='text-3xl mb-2'>Features</h2>
					<div className="flex flex-wrap justify-center">
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>Register / Login</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>Account Verify Email</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>Forgot Password</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>Admin, Guest, Writer</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>Like - Dislike</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>Comment</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>View of Post</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>JWT</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>MongoDB</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>Redux Toolkit</span>
						<span className='bg-orange-400 font-medium m-2 p-1 rounded-md shadow-lg'>... More</span>
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	</>
}

export default Root