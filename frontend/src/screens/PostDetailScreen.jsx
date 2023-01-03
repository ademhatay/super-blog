import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BanIcon, CheckIcon, EyeIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, getPostByIdAction, postLikeAction, toggleAddDisLikesToPost } from "../app/slices/posts/postSlices";

const PostDetail = () => {

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getPostByIdAction(id));
	}, [dispatch, id]);

	const { post } = useSelector((state) => state.post);
	const { userAuth } = useSelector((state) => state.users);

	const handleDeletePost = () => {
		dispatch(deletePostAction(id));
		navigate("/live-posts")
	};


	return (
		<>
			<Container>
				<section className="py-10 bg-gray-800 overflow-hidden">
					<div className="container px-4 mx-auto">
						<img
							className="mb-24 w-full h-96 object-cover"
							src={post?.image}
							alt="post cover"
						/>
						<div className="max-w-2xl mx-auto text-center">
							<h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
								{post?.title}
							</h2>
							<div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
								<img
									className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
									src={post?.user[0].profilePhoto}
									alt="user profile"
								/>
								<div className="text-left">
									<h4 className="mb-1 text-2xl font-bold text-gray-50">
										<span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
											{post?.user[0]?.firstName?.toUpperCase()} {post?.user[0]?.lastName?.toUpperCase()}
										</span>
									</h4>
									<p className="text-gray-500">
										{post?.user[0].email}
									</p>
								</div>
							</div>
							<div className="mx-auto">
								<div className="mb-6 text-left  text-xl text-gray-200">
									{post?.description}
									<div className="flex justify-between items-center my-10">
										{
											userAuth?._id === post?.user[0]?._id && (
												<div className="flex items-center">
													<Link to={`edit`}>
														<PencilAltIcon className="h-8 text-yellow-300" />
													</Link>
													<button
														onClick={handleDeletePost}
													className="ml-3">
														<TrashIcon className="h-8 text-red-600" />
													</button>
												</div>
											)
										}
										<div className="flex">
											<button
												onClick={() => dispatch(postLikeAction(post?._id))}
												className="flex mx-2">
												{
													post?.likes?.find((like) => like === userAuth?._id) ? (
														<CheckIcon className="h-8 text-green-400" />
													) : (
														<CheckIcon className="h-8" />
													)
												}
												{post?.likes?.length}
											</button>
											<button
												onClick={() => dispatch(toggleAddDisLikesToPost(post?._id))}
												className="flex mx-2">
												{
													post?.dislikes?.find((dislike) => dislike === userAuth?._id) ? (
														<BanIcon className="h-8 text-red-400" />
													) : (
														<BanIcon className="h-8" />
													)
												}

												{post?.dislikes?.length}
											</button>
											<div className="flex mx-2">
												<EyeIcon className="h-8" />
												{post?.numViews}
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
					{/* Add comment Form component here */}

					<div className="flex justify-center  items-center">
						{/* <CommentsList comments={post?.comments} postId={post?._id} /> */}
						CommentsList
					</div>
				</section>
			</Container>
		</>
	);
};

export default PostDetail;
