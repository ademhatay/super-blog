import { BanIcon, CheckIcon, EyeIcon } from '@heroicons/react/solid';
import React from 'react'
import { Link } from 'react-router-dom'


const PostCard = ({ post, userAuth }) => {


	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	return <>
		{/* post */}
		<div className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
			<div className='flex flex-col lg:flex-row'>
				<div className='w-full lg:w-2/5'>
					<img src={post?.image} alt='post' className='w-full h-48 object-cover p-1' />

					<div className='flex justify-between items-center mt-3'>
						<div className='flex items-center'>
							<img src={post?.user[0]?.profilePhoto} alt='post' className='w-10 h-10 rounded-full object-cover' />
							<span className='ml-2 text-sm'>
								{capitalizeFirstLetter(post?.user[0]?.firstName)} {capitalizeFirstLetter(post?.user[0]?.lastName)}
							</span>
						</div>

						{/* stats here */}

						<div className='flex items-center justify-evenly'>
							<div className='flex items-center mx-2'>
								<CheckIcon className='h-5 w-5 text-green-400' />
								{post?.likes?.length}
							</div>
							<div className='flex items-center mx-2'>
								<BanIcon className='h-5 w-5 text-red-400' />
								{post?.dislikes?.length}

							</div>
							<div className='flex items-center mx-2'>
								<EyeIcon className='h-5 w-5 text-blue-400' />
								{post?.numViews}
							</div>
						</div>

						{/* stats here */}
					</div>

				</div>
				<div className='w-full lg:w-3/5 flex flex-col justify-between lg:px-10 py-5 '>
					<div>
						<h3 className='text-xl font-bold'>{post.title}
						</h3>

						<h4 className='text-base text-orange-400 font-medium'>
							{post.category[0].title.toUpperCase()}
						</h4>
					</div>
					<div className='text-sm'>
						{
							post.description.length > 20 ? post.description.slice(0, 20) + '...' : post.description
						}
					</div>

					<div className='flex justify-evenly flex-col lg:flex-row mt-5'>
						<Link to={`/post/${post._id}`} className='bg-blue-400 my-1 lg:my-0 px-3 py-1 rounded-md text-white'>View Post</Link>

						{post.user[0]._id === userAuth._id && <Link to={`/post/${post._id}/edit`}className='bg-green-400 my-1 lg:my-0 px-3 py-1 rounded-md text-white lg:ml-2'>Edit Post</Link>}

					</div>
				</div>

			</div>
		</div>
	</>
}

export default PostCard