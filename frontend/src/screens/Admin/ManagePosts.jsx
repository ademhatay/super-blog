import React from 'react'

const ManagePosts = () => {
	return <>
		<div className='w-full h-full  bg-gray-50 p-5 '>
			<h2 className='text-2xl text-center font-bold bg-green-400'>Super Posts</h2>
			<div className='w-full lg:w-8/12 mx-auto flex justify-center  bg-white p-4 my-3 rounded-md shadow-lg flex-col'>
				<div className='text-3xl text-center font-bold italic '>
					Manage Posts
				</div>
				<div>
					<table className='w-full'>
						<thead>
							<tr>
								<th className='border-b border-gray-200 p-2'>#</th>
								<th className='border-b border-gray-200 p-2'>Post</th>
								<th className='border-b border-gray-200 p-2'>Action</th>
							</tr>
						</thead>
						<tbody>
						<tr className='text-center'>
								<td className='border-b border-gray-200 p-2'>1</td>
								<td className='border-b border-gray-200 p-2'>Posts</td>
								<td className='border-b flex justify-evenly border-gray-200 p-2'>
									<button className='bg-yellow-400 text-white p-1 rounded-md'>
										Show
									</button>
								</td>
							</tr>

							<tr className='text-center'>
								<td className='border-b border-gray-200 p-2'>2</td>
								<td className='border-b border-gray-200 p-2'>Posts</td>
								<td className='border-b flex justify-evenly border-gray-200 p-2'>
									<button className='bg-yellow-400 text-white p-1 rounded-md'>
										Show
									</button>
								</td>
							</tr>

							<tr className='text-center'>
								<td className='border-b border-gray-200 p-2'>3</td>
								<td className='border-b border-gray-200 p-2'>Posts</td>
								<td className='border-b flex justify-evenly border-gray-200 p-2'>
									<button className='bg-yellow-400 text-white p-1 rounded-md'>
										Show
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</>
}

export default ManagePosts