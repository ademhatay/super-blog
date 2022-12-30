import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Container } from '../../components'

const actions = [
	{
		name: 'Stats',
		link: '',
		color: 'bg-yellow-400',
	},
	{
		name: 'Create Post',
		link: '/create-post',
		color: 'bg-orange-400',
	},
	{
		name: 'Create Category',
		link: 'create-category',
		color: 'bg-blue-400',
	},
	{
		name: 'Choose Topic of the Week',
		link: 'choose-topic',
		color: 'bg-purple-400',
	},
	{
		name: 'Manage Users',
		link: 'manage-users',
		color: 'bg-green-400',
	},
	{
		name: 'Manage Posts',
		link: 'manage-posts',
		color: 'bg-red-400',
	},
	{
		name: 'Manage Comments',
		link: 'manage-comments',
		color: 'bg-indigo-400',
	},
]

const AdminScreen = () => {
	return <>
		<Container>
			<div className="flex h-full flex-col lg:flex-row">
				<div className='w-full lg:w-1/3 bg-gray-50 border-b-2 lg:border-r-2 p-5 flex flex-col items-center justify-center'>
					<h2 className='text-2xl font-bold bg-purple-400'>
						Admin Actions
					</h2>


					{actions.map((action, index) => (
						<Link key={index} to={action.link} className={`w-full my-3 h-20 rounded-md px-5 py-2 ${action.color} shadow-lg flex justify-center items-center`}>
							<span className='text-xl font-bold'>{action.name}</span>
						</Link>
					))}

				</div>

				<Outlet />
			</div>
		</Container>
	</>
}

export default AdminScreen