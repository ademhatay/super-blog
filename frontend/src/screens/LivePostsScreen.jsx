import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, PostCard } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAction } from '../app/slices/category/categorySlice';
import { fetchAllPostsAction } from '../app/slices/posts/postSlices';

const LivePostsScreen = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoryAction());
		dispatch(fetchAllPostsAction());
	}, [dispatch]);

	const { categoryList, loading: CategoryLoading } = useSelector((state) => state?.category);
	const { allPosts, loading: PostLoading } = useSelector((state) => state?.post);
	const { userAuth } = useSelector((state) => state?.users);


	return <>
		<Container>
			{!userAuth ? (<div className='w-full h-full bg-red-500 flex items-center justify-center'>
				<h2 className='text-2xl font-bold'>You are not logged in. Please <Link to='/auth/login' className='text-blue-500'>Login</Link> to see this page</h2>
			</div>
			) : (
				<div className="flex min-h-screen flex-col lg:flex-row">
					<div className='w-full lg:fixed top-20 lg:min-h-screen  lg:w-1/4 bg-teal-700  p-5 flex flex-col items-center justify-start'>
						<h2 className='text-2xl font-bold bg-purple-600'>Categories</h2>
						{
							CategoryLoading ? (
								<div className="flex items-center justify-center w-full h-full">
									<div className="flex space-x-2 animate-spin">
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									</div>
								</div>
							) : categoryList && categoryList.map((category) => (
								<button key={category._id} className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
									{category.title}
								</button>
							))
						}

					</div>
					{/* fake */}
					<div className='w-full  lg:min-h-screen  lg:w-1/4 bg-teal-700  p-5 flex flex-col items-center justify-start'>

						{/* fake */}
					</div>
					{/* fake */}
					<div className='w-full h-full lg:w-3/4  bg-gray-50 p-5 flex flex-col items-center justify-center'>
						<h2 className='text-2xl font-bold  bg-orange-400'>Live Posts</h2>


						{
							PostLoading ? (
								<div className="flex items-center justify-center w-full h-full">
									<div className="flex space-x-2 animate-spin">
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
									</div>
								</div>
							) : allPosts && allPosts.map((post) => (
								<PostCard key={post._id} post={post} userAuth={userAuth} />
							))
						}

					</div>
				</div>
			)}
		</Container>
	</>
}

export default LivePostsScreen