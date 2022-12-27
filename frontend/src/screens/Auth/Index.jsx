import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
	return <>
		<div className='w-full lg:w-1/2   min-h-[350px] shadow-2xl flex flex-col justify-evenly items-center pt-5'>
			<h1 className='text-3xl my-5'>Register or Login</h1>
			<Link
				className='w-10/12 lg:w-1/2 bg-orange-400 text-white font-semibold text-center rounded-lg py-2 my-4'
				to="/auth/login">Login</Link>
			<Link
				className='w-10/12 lg:w-1/2 bg-orange-400 text-white font-semibold text-center rounded-lg py-2 my-4'
				to="/auth/register">Register</Link>
		</div>
	</>
}

export default Index