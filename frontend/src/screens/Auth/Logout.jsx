import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../app/slices/users/usersSlices';


const Logout = () => {
	const [count, setCount] = useState(5);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const timer = setTimeout(() => {
			setCount(count - 1);
			if (count === 0) {
				// logout the user
				dispatch(logoutUserAction())
				// stop the timer
				clearTimeout(timer);
				// redirect to home page
				navigate('/');
			}
		}, 1000);
	}, [count, dispatch, navigate]);


	return <>
		<div className='w-full lg:w-1/2 h-full shadow-2xl flex flex-col justify-center items-center pt-5'>
			<h1 className='text-4xl font-bold'>Logout</h1>

			<div className='w-full flex flex-col justify-center items-center'>
				<p className='text-2xl font-bold'>You have been logged out</p>
				<p className='text-2xl font-bold'>Thank you for using our app</p>
				<p className='text-2xl font-bold'>See you soon</p>
			</div>
		</div>

		<div className='w-full flex flex-col justify-center items-center'>
			<p className='text-2xl font-bold'>Redirecting to home page in 5 seconds</p>
			<span className='text-2xl font-bold'>
				{count}
			</span>
		</div>
	</>
}

export default Logout