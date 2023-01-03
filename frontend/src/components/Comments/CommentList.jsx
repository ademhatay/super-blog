import { Link, useParams } from "react-router-dom";
import { PencilAltIcon } from "@heroicons/react/solid";
import Moment from "react-moment";
import {  useSelector } from "react-redux";

import AddComment from "./AddComment";

export default function CommentsList({ comments }) {
	const { id } = useParams();

	const user = useSelector(state => state?.users);
	const { userAuth } = user;
	const isLoginuser = userAuth?._id;

	return (
		<div>
			<AddComment postId={id} />
			<ul className="divide-y bg-gray-700 w-96 divide-gray-200 p-3 mt-5">
				<div className="text-gray-400">{comments?.length} Comments</div>
				<>
					{comments?.length <= 0 ? (
						<h1 className="text-yellow-400 text-lg text-center">No comments</h1>
					) : (
						comments?.map((comment) => (
							<div key={comment._id}>
								<li className="py-4  w-full">
									<div className="flex space-x-3">
										<img
											className="h-6 w-6 rounded-full"
											src={comment?.user?.profilePhoto}
											alt="userr"
										/>
										<div className="flex-1 space-y-1">
											<div className="flex items-center justify-between">
												<h3 className="text-sm font-medium text-green-400">
													{comment?.user?.firstName} {comment?.user?.lastName}
												</h3>
												<p className="text-bold text-yellow-500 text-base ml-5">
													<Moment fromNow ago>
														{comment?.createdAt}
													</Moment>
												</p>
											</div>
											<p className="text-sm text-gray-400">
												{comment?.description}
											</p>

											{isLoginuser === comment?.user?._id ? (
												<p className="flex">
													<Link
														to={`/comment/${comment?._id}/edit`}
														className="p-3"
													>
														<PencilAltIcon className="h-5 mt-3 text-yellow-300" />
													</Link>
												</p>
											) : null}
										</div>
									</div>
								</li>
							</div>
						))
					)}
				</>
			</ul>
		</div>
	);
}
