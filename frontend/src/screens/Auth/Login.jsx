import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
	return <>
		<div className='w-full lg:w-1/2 h-full shadow-2xl flex flex-col justify-center items-center pt-5'>
			<h1 className='text-4xl font-bold'>Login</h1>
			<p className='text-gray-400 text-center my-3'>
				Login your account <br /> I dont have account <Link to="/auth/register" className='text-blue-400 font-semibold'>Create Account</Link>
			</p>
			<form className='w-full'>
				<div className="input-group flex my-3 flex-col items-center">
					<input
						className='w-10/12 lg:w-1/2 border-2 rounded-md p-3'
						type="email"
						placeholder='Email'
					/>
					<p className='text-red-400 text-sm lg:text-base'>
						Email required
					</p>
				</div>
				<div className="input-group flex my-3 flex-col items-center">
					<input
						className='w-10/12 lg:w-1/2 border-2 rounded-md p-3'
						type="password"
						placeholder='Password'
					/>
					<p className='text-red-400 text-sm lg:text-base'>
						Password required
					</p>
				</div>
				<div className="input-group flex my-3 flex-col items-center">
					<button className='border w-10/12 lg:w-1/2 py-2 rounded-lg bg-orange-400 text-white font-bold'>
						Register
					</button>
				</div>
			</form>
		</div>
	</>
}

export default Login