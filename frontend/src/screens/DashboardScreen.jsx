import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from '../components';



const DashboardScreen = () => {
	return <>
		<Container>
			<div className="flex flex-col lg:flex-row">
				<div className='w-full lg:w-1/3 bg-red-400 h-auto p-5'>
					<h1 className='text-2xl font-bold'>Latest Posts</h1>

					<div className='w-full my-3 rounded-md px-5 py-2 bg-white'>
						<h2 className='text-xl font-bold'>Post Title</h2>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
						</p>
						<Link to='/post/1' className='text-blue-500'>Read More</Link>
						<hr className='my-3' />
						<div className='flex w-full justify-evenly items-center'>

							<p className=' font-bold'>Author</p>
							<p className=''>Date</p>
						</div>
					</div>

					<div className='w-full my-3 rounded-md px-5 py-2 bg-white'>
						<h2 className='text-xl font-bold'>Post Title</h2>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
						</p>
						<Link to='/post/1' className='text-blue-500'>Read More</Link>
						<hr className='my-3' />
						<div className='flex w-full justify-evenly items-center'>

							<p className=' font-bold'>Author</p>
							<p className=''>Date</p>
						</div>
					</div>

					<div className='w-full my-3 rounded-md px-5 py-2 bg-white'>
						<h2 className='text-xl font-bold'>Post Title</h2>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
						</p>
						<Link to='/post/1' className='text-blue-500'>Read More</Link>
						<hr className='my-3' />
						<div className='flex w-full justify-evenly items-center'>

							<p className=' font-bold'>Author</p>
							<p className=''>Date</p>
						</div>
					</div>

					
				</div>
				<div className='w-full lg:w-2/3 bg-blue-400'>
					<div className='w-full bg-white'>
						123
					</div>
					<div>
						Actions
					</div>
					<div>
						Activity Log
					</div>
				</div>
			</div>
		</Container>
	</>
}

export default DashboardScreen