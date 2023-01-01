import React from 'react'
import { Link } from 'react-router-dom'

const PostScreen = () => {
	return <>
		{/* post */}
		<div className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
			<div className='flex flex-col lg:flex-row'>
				<div className='w-full lg:w-2/5'>
					<img src='https://avatars.githubusercontent.com/u/66277966?v=4' alt='post' className='w-full h-48 object-cover' />

					<div className='flex justify-between items-center mt-3'>
						<div className='flex items-center'>
							<img src='https://avatars.githubusercontent.com/u/66277966?v=4' alt='post' className='w-10 h-10 rounded-full object-cover' />
							<span className='ml-2 text-sm'>Adem Hatay</span>
						</div>

						<div className='flex items-center'>
							<span className='mr-2 flex'>
								10
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
								</svg>

							</span>
							<span className='mr-2 flex'>
								7
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
								</svg>

							</span>
							<span className='mr-2 flex items-center'>
								74
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>

							</span>
						</div>

					</div>

				</div>
				<div className='w-full lg:w-3/5 flex flex-col justify-between lg:px-10 py-5 '>
					<div>
						<h3 className='text-xl font-bold'>Post Title
							<span className='ml-2 text-sm'>01 Jan 2023</span>
						</h3>

						<h4 className='text-lg font-bold'>Post Category</h4>
					</div>
					<div className='text-sm'>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit nihil perferendis cumque hic, provident sint dignissimos? Illo, architecto officia commodi quibusdam dolor quae iure quam quis quaerat perspiciatis iusto odit?
					</div>

					<div className='flex justify-evenly flex-col lg:flex-row mt-5'>
						<Link to='/post/1' className='bg-blue-400 my-1 lg:my-0 px-3 py-1 rounded-md text-white'>View Post</Link>
						<Link to='/post/1/edit' className='bg-green-400 my-1 lg:my-0 px-3 py-1 rounded-md text-white lg:ml-2'>Edit Post</Link>
						<Link to='/post/1/delete' className='bg-red-400 my-1 lg:my-0 px-3 py-1 rounded-md text-white lg:ml-2'>Delete Post</Link>
						<Link to='/post/1/comment' className='bg-purple-400 my-1 lg:my-0 px-3 py-1 rounded-md text-white lg:ml-2'>Comment</Link>
					</div>
				</div>

			</div>
		</div>
	</>
}

export default PostScreen