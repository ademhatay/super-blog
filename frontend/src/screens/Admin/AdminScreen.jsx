import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Container } from '../../components'
import { getUser } from '../../utils/isAdmin'

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
		name: 'Manage Category',
		link: 'manage-category',
		color: 'bg-pink-400',
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
	const [isAdmin, setIsAdmin] = useState(false)
	const navigate = useNavigate()
	const { userAuth } = useSelector((state) => state.users);

	useEffect(() => {
		getUser(userAuth).then((res) => {
			if (res) {
				setIsAdmin(true)
			} else {
				navigate('/dashboard')
			}
		})
	}, [userAuth]);




	return <>
		{isAdmin && <Container>
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
		</Container>}
	</>
}

export default AdminScreen