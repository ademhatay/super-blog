import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';


const adminDropdown = [
	{
		name: 'Super Stats',
		link: '/admin'
	},
	{
		name: 'Weekly Topic',
		link: '/admin/choose-topic'
	},
	{
		name: 'Manage Categories',
		link: '/admin/manage-category'
	},
	{
		name: 'Manage Users',
		link: '/admin/manage-users'
	},
	{
		name: 'Manage Posts',
		link: '/admin/manage-posts'
	},
	{
		name: 'Manage Comments',
		link: '/admin/manage-comments'
	}
]


const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { userAuth } = useSelector(state => state?.users);

	const { pathname } = useLocation();

	const isActive = (path) => {
		if (pathname === path) {
			return 'text-white'
		} else {
			return 'text-teal-200 hover:text-white'
		}
	}


	return <>
		<nav className="flex fixed top-0 w-screen items-center justify-between flex-wrap bg-teal-500 px-6 py-3 z-30">
			<Link to="/" className="flex items-center flex-shrink-0 text-white mr-6">
				<span className="font-semibold text-2xl tracking-tight">Super Blog</span>
			</Link>
			<div className="block lg:hidden">
				<button onClick={() => setIsOpen(!isOpen)} className="items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
				</button>
			</div>
			<div className={`w-full ${isOpen ? 'block' : 'hidden'} flex-grow lg:flex lg:items-center lg:w-auto`}>
				<div className="text-lg flex flex-col text-center items-center lg:block lg:flex-row  lg:flex-grow justify-center lg:text-left">



					<Link to='/dashboard' className={`block mt-4 lg:inline-block lg:mt-0 hover:text-white lg:mr-4 w-1/2 lg:w-auto ${isActive('/dashboard')} `}>
						Dashboard
					</Link>
					<Link to='/live-posts' className={`block mt-4 lg:inline-block lg:mt-0 hover:text-white lg:mr-4 w-1/2 lg:w-auto ${isActive('/live-posts')} `}>
						Live Posts
					</Link>
					<Link to='/live-categories' className={`block mt-4 lg:inline-block lg:mt-0 hover:text-white lg:mr-4 w-1/2 lg:w-auto ${isActive('/live-categories')} `}>
						Live Categories
					</Link>
					{
						userAuth?.isAdmin && <div className={`group relative block mt-4 lg:inline-block lg:mt-0 cursor-pointer  hover:text-white lg:mr-4  ${pathname.includes('admin') ? 'text-white' : 'text-teal-200'}  w-1/2 lg:w-auto`}>
							Admin Panel
							<div className={`origin-top-right hidden group-hover:block absolute left-0 top-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black z-40 ring-opacity-5 focus:outline-none`}>

								<div className="py-1" role="none">
									{
										adminDropdown.map((item, index) => (
											<Link key={index} to={item.link} className="block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{item.name}</Link>
										))
									}


								</div>
							</div>
						</div>
					}

					<div className={`group relative block mt-4 lg:inline-block lg:mt-0 cursor-pointer  hover:text-white lg:mr-4  w-1/2 lg:w-auto ${pathname.includes('create') && !pathname.includes('admin') ? 'text-white' : 'text-teal-200'} `}>
						Create
						<div className={`origin-top-right hidden group-hover:block absolute left-0 top-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20`}>

							<div className="py-1" role="none">
								<Link to="/create-post" className="block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Create Post</Link>
								<Link to="/create-category" className="block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Create Category</Link>
							</div>
						</div>
					</div>

				</div>
				<div className='flex flex-col w-1/2 lg:w-auto mx-auto mt-5 lg:mt-0  lg:mx-0 lg:flex-row'>
					{userAuth && <div className="relative group inline-block text-left">
						<div>
							<div className="inline-flex justify-center w-full   shadow-sm font-semibold text-gray-700 p-0 m-0 cursor-pointer">
								<img className="w-14 h-14 rounded-full" src={userAuth.profilePhoto} alt="user profile" />
							</div>
						</div>
						<div className={`origin-top-right hidden group-hover:block absolute right-0 top-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							<p className='border-b '>
								<span className="block px-4 py-2 text-gray-700">
									{userAuth.firstName} {userAuth.lastName}
								</span>
							</p>
							<div className="py-1" role="none">
								<Link to={`/profile/${userAuth._id}`} className="block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</Link>
								<Link to="/settings" className="block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Settings</Link>
								<Link to="/auth/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</Link>
							</div>
						</div>
					</div>}


					{/* <button className="flex justify-center items-center px-4 py-2 leading-none border rounded text-white bg-red-400 border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-2 font-medium">
						<svg className="w-6 h-6 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
						Logout
					</button>*/}
				</div>
			</div>
		</nav>
	</>
}

export default Navbar