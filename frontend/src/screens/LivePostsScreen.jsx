import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Container, PostCard } from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoryAction } from '../app/slices/category/categorySlice';
import { fetchAllPostsAction } from '../app/slices/posts/postSlices';

const LivePostsScreen = () => {
	const [selectedCategory, setSelectedCategory] = useState('ALL');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoryAction());
		dispatch(fetchAllPostsAction());
	}, [dispatch]);

	const { categoryList, loading: CategoryLoading, serverErr: CatServerError, appErr: CatAppError } = useSelector((state) => state?.category);
	const { allPosts, loading: PostLoading, serverErr: PostServerError, appErr: PostAppError } = useSelector((state) => state?.post);
	const { userAuth } = useSelector((state) => state?.users);

	const filteredPosts = selectedCategory === 'ALL' ? allPosts : allPosts.filter((post) => post.category[0].title.toUpperCase() === selectedCategory);

	return <>
		<Container>
			{
				allPosts?.length === 0 ? (
					<div className='w-full h-full bg-red-500 flex items-center justify-center'>
						<h2 className='text-2xl font-bold'>No Posts Found</h2>
					</div>
				) : !userAuth ? (<div className='w-full h-full bg-red-500 flex items-center justify-center'>
					<h2 className='text-2xl font-bold'>You are not logged in. Please <Link to='/auth/login' className='text-blue-500'>Login</Link> to see this page</h2>
				</div>
				) : (
					<div className="flex min-h-screen flex-col lg:flex-row">
						<div className='w-full lg:fixed top-20 lg:min-h-screen  lg:w-1/4 bg-teal-700  p-5 flex flex-col items-center justify-start'>
							<h2 className='text-2xl font-bold bg-purple-600'>Categories</h2>
							<button onClick={() => setSelectedCategory('ALL')} className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
								ALL
							</button>
							{
								CategoryLoading ? (
									<div className="flex items-center justify-center w-full h-full">
										<div className="flex space-x-2 animate-spin">
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
											<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
										</div>
									</div>
								) : categoryList && categoryList.filter((cat) => cat.title !== 'ALL').map((cat) => (
									<button key={cat._id} onClick={() => setSelectedCategory(cat.title.toUpperCase())} className='w-full my-3 rounded-md px-5 py-2 bg-white shadow-lg'>
										{cat.title}
									</button>

								))
							}

							{
								CatServerError && (
									<div className='w-full h-full bg-red-500 flex items-center justify-center'>
										<h2 className='text-2xl font-bold'>{CatServerError}</h2>
									</div>
								)}
							{
								CatAppError && (
									<div className='w-full h-full bg-red-500 flex items-center justify-center'>
										<h2 className='text-2xl font-bold'>{CatAppError}</h2>
									</div>
								)
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
								) : allPosts && filteredPosts.map((post) => (
									<PostCard key={post._id} post={post} userAuth={userAuth} />
								))
							}
							{
								PostServerError && (
									<div className='w-full h-full bg-red-500 flex items-center justify-center'>
										<h2 className='text-2xl font-bold'>{PostServerError}</h2>
									</div>
								)}
							{
								PostAppError && (
									<div className='w-full h-full bg-red-500 flex items-center justify-center'>
										<h2 className='text-2xl font-bold'>{PostAppError}</h2>


									</div>
								)
							}
						</div>
					</div>
				)}
		</Container>
	</>
}

export default LivePostsScreen