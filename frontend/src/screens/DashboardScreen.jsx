import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from '../components';

const DashboardScreen = () => {
	return <>
		<Container>
			<div className="flex h-full flex-col lg:flex-row">
				<div className='w-full lg:w-1/3 bg-gray-50 border-b-2 lg:border-r-2  p-5 flex flex-col items-center justify-center'>
					<h2 className='text-2xl font-bold bg-purple-600'>Latest Posts</h2>

					<div className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
						<h2 className='text-xl font-bold'>Post Title - Category 1</h2>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
						</p>
						<Link to='/post/1' className='text-blue-500'>Read More</Link>
						<hr className='my-3' />
						<div className='flex justify-evenly items-center'>

							<p className=' font-bold'>Author</p>
							<p className=''>Date</p>
						</div>
					</div>
					<div className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
						<h2 className='text-xl font-bold'>Post Title - Category 2</h2>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
						</p>
						<Link to='/post/1' className='text-blue-500'>Read More</Link>
						<hr className='my-3' />
						<div className='flex justify-evenly items-center'>

							<p className=' font-bold'>Author</p>
							<p className=''>Date</p>
						</div>
					</div>

					<div className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
						<h2 className='text-xl font-bold'>Post Title - Category 3</h2>
						<p className='text-sm'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
						</p>
						<Link to='/post/1' className='text-blue-500'>Read More</Link>
						<hr className='my-3' />
						<div className='flex justify-evenly items-center'>

							<p className=' font-bold'>Author</p>
							<p className=''>Date</p>
						</div>
					</div>
				</div>

				<div className='w-full lg:w-1/3 border-b-2 lg:border-r-2  bg-gray-50 p-5 flex flex-col items-center justify-center'>
					<h2 className='text-2xl font-bold bg-green-400'>Topic of Weeks </h2>
					<div className='bg-white w-full p-2 my-3 rounded-md shadow-lg'>
						<p className='text-base text-center'>
							This week we are talking about the topic of <span className='font-bold'> Global Warming</span>
						</p>
					</div>
					<div className='bg-white px-4 my-3 rounded-md shadow-lg'>
						<h2 className='text-2xl font-bold'>Users</h2>
						<hr className='my-1' />
						<p className='text-base'>
							<span className='font-bold'> 10 </span> users have joined this week
						</p>
						<div className='flex flex-wrap justify-start items-center'>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
						</div>
						<hr className='my-1' />
						<div className='text-base'>
							<div className='w-3 h-3 bg-green-500 rounded-full inline-block mr-2'></div>
							<span className='font-bold'> 3 </span> active users
						</div>
						<div className='flex flex-wrap justify-start items-center'>
							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>

							<div className='w-1/2 flex items-center my-1'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>

							<div className='w-1/2 flex items-center my-1	'>
								<img src="https://via.placeholder.com/150" alt="" className='w-10 h-10 rounded-full' />
								<div className='ml-2'>User Name</div>
							</div>
						</div>
					</div>
				</div>

				<div className='w-full lg:w-1/3 bg-gray-50 p-5 flex flex-col items-center justify-center'>
					<h2 className='text-2xl font-bold  bg-orange-400'>Profile Overview</h2>
					<div className='bg-white w-full p-2 my-3 rounded-md shadow-lg'>
						<div className='flex justify-between items-center'>
							<div className='w-1/2 flex flex-col items-start'>
								<div>
									<span className='font-bold'>Name:</span> User Name
								</div>
								<div>
									<span className='font-bold'>Status:</span> Verified
								</div>
								<div>
									<span className='font-bold'>Post Count:</span> 2
								</div>
								<div>
									<span className='font-bold'>Total Views:</span> 175
								</div>
								<div>
									<span className='font-bold'>Total Likes:</span> 10
								</div>
								<div>
									<span className='font-bold'>Followers:</span> 24
								</div>
								<div>
									<span className='font-bold'>Following:</span> 12
								</div>
							</div>
							<div className='px-6 -py-3 w-1/2 flex flex-col items-center'>
								<img src="https://avatars.githubusercontent.com/u/66277966?v=4" alt="" className='w-full rounded-full' />
							</div>
						</div>
					</div>

					<div className='bg-white w-full px-3 my-3 rounded-md shadow-lg'>
						<h2 className='text-2xl font-bold'>Actions</h2>
						<hr className='my-1' />
						<div className='flex flex-wrap items-center justify-center'>
							<button className='bg-blue-500 w-1/3 text-white px-4 py-1 rounded-md m-2'>Edit Profile</button>

							<button className='bg-green-500 w-auto text-white px-4 py-1 rounded-md m-2'>Verify Account</button>

							<button className='bg-yellow-500 w-1/3 text-white px-4 py-1 rounded-md m-2'>Logout</button>

							<button className='bg-red-500 w-auto text-white px-4 py-1 rounded-md m-2'>Delete Account</button>
							<button className='bg-orange-500 w-full text-white px-4 py-1 rounded-md m-2'>Create Post</button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	</>
}

export default DashboardScreen