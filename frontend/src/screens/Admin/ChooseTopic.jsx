import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const ChooseTopic = () => {

	const [open, setOpen] = useState(false);

	return <>
		<div className='w-full h-full  bg-gray-50 p-5 '>
			<h2 className='text-2xl text-center font-bold bg-green-400'>Super Topic</h2>
			<div className="flex justify-center flex-col gap-5 flex-wrap">
				<div className='w-full lg:w-8/12 mx-auto  flex flex-col justify-center  bg-white p-4 my-3 rounded-md shadow-lg'>
					<div className='text-3xl text-center font-bold italic '>
						Choose Topic
					</div>
					<div className='relative'>
						<form className='flex flex-col gap-5 mt-4'>
							<button onClick={() => setOpen(!open)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center flex items-center justify-between dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
								Select Week Topic
								<svg className="ml-2 w-4 h-4" ariaHidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
							</button>


							<div className={` ${open ? 'block' : 'hidden'} z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 absolute top-16`}>
								<ul className="py-1 text-sm text-gray-700 dark:text-gray-200">

									<li>
										<Link to="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cat 1</Link>
									</li>
									<li>
										<Link to="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cat 1</Link>
									</li>
									<li>
										<Link to="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cat 1</Link>
									</li>
									<li>
										<Link to="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Cat 1</Link>
									</li>
								</ul>
							</div>


							<button className='bg-green-400 text-white p-2 rounded-md'>
								Choose
							</button>
						</form>
					</div>
				</div>
				<div className='w-full lg:w-8/12 mx-auto flex justify-center  bg-white p-4 my-3 rounded-md shadow-lg flex-col'>
					<div className='text-3xl text-center font-extrabold italic '>
						Old Topic
					</div>
					<div>
						<table className='w-full'>
							<thead>
								<tr>
									<th className='border-b border-gray-200 p-2'>#</th>
									<th className='border-b border-gray-200 p-2'>Topic Name</th>
								</tr>
							</thead>
							<tbody>
								<tr className='text-center'>
									<td className='border-b border-gray-200 p-2'>1</td>
									<td className='border-b border-gray-200 p-2'>Category Name 1</td>
								</tr>

								<tr className='text-center'>
									<td className='border-b border-gray-200 p-2'>1</td>
									<td className='border-b border-gray-200 p-2'>Category Name 1</td>
								</tr>
								<tr className='text-center'>
									<td className='border-b border-gray-200 p-2'>1</td>
									<td className='border-b border-gray-200 p-2'>Category Name 1</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default ChooseTopic