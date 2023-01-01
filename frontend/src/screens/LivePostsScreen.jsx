import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from '../components';
import PostScreen from './PostScreen';

const LivePostsScreen = () => {
	return <>
		<Container>
			<div className="flex h-full flex-col lg:flex-row">
				<div className='w-full h-full  lg:w-1/4 bg-teal-700  p-5 flex flex-col items-center justify-center'>
					<h2 className='text-2xl font-bold bg-purple-600'>Categories</h2>

					<Link to='/category/1' className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
						Category 1
					</Link>

					<Link to='/category/2' className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
						Category 2
					</Link>

					<Link to='/category/3' className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
						Category 3
					</Link>

					<Link to='/category/4' className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
						Category 4
					</Link>
				</div>
				<div className='w-full lg:w-3/4 bg-gray-50 p-5 flex flex-col items-center justify-center'>
					<h2 className='text-2xl font-bold  bg-orange-400'>Posts</h2>
					
					<PostScreen />
					<PostScreen />
					<PostScreen />
					<PostScreen />

					




				</div>
			</div>
		</Container>
	</>
}

export default LivePostsScreen