import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { useSelector } from 'react-redux';


const menu = [
	{
		name: 'Dashboard',
		link: '/dashboard'
	},
	{
		name: 'Live Posts',
		link: '/live-posts'
	}
]

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const { pathname } = useLocation();

	const isActive = (path) => {
		if (pathname === path) {
			return 'text-white'
		} else {
			return 'text-teal-200 hover:text-white'
		}
	}

	const { userAuth } = useSelector(state => state?.users);

	return <>
		<nav className="flex fixed top-0 w-screen items-center justify-between flex-wrap bg-teal-500 px-6 py-3">
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


					{
						menu.map((item, index) => (
							<Link key={index} to={item.link} className={`block mt-4 lg:inline-block lg:mt-0 hover:text-white lg:mr-4 w-1/2 lg:w-auto ${isActive(item.link)} `}>
								{item.name}
							</Link>
						))
					}
	
					{
						userAuth?.isAdmin && <Link to="/admin" className={`block mt-4 lg:inline-block lg:mt-0  hover:text-white lg:mr-4  w-1/2 lg:w-auto ${pathname.includes('admin') ? 'text-white': 'text-teal-200'} `}>
							Admin Panel
						</Link>
					}
 

				</div>
				<div className='flex flex-col w-1/2 lg:w-auto mx-auto mt-5 lg:mt-0  lg:mx-0 lg:flex-row'>
					<div className="relative inline-block text-left">
						<div>
							<button onClick={() => setIsProfileOpen(!isProfileOpen)} type="button" className="inline-flex justify-center w-full   shadow-sm font-semibold text-gray-700 p-0 m-0" id="options-menu" aria-haspopup="true" aria-expanded="true">
								<img className="w-14 h-14 rounded-full" src={userAuth.profilePhoto} alt="user profile" />
							</button>
						</div>
						<div className={`origin-top-right ${isProfileOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
							<p className='border-b '>
								<span className="block px-4 py-2 text-gray-700">
									{userAuth.firstName} {userAuth.lastName}
								</span>
							</p>
							<div className="py-1" role="none">
								<Link to="/profile" className="block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</Link>
								<Link to="/settings" className="block px-4 py-2  text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Settings</Link>
								<Link to="/auth/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Logout</Link>
							</div>
						</div>
					</div>


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