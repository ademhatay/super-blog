import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { PencilAltIcon } from "@heroicons/react/outline";

import { fetchCategoryAction } from "../../app/slices/category/categorySlice";
import { Container } from "../../components";
import { DateFormatter } from "../../utils";
import { getUser } from "../../utils/isAdmin";


const CategoryList = () => {

	const [isAdmin, setIsAdmin] = useState(false);

	const dispatch = useDispatch();
	const { userAuth } = useSelector(state => state?.users);

	useEffect(() => {
		getUser(userAuth).then((res) => {
			if (res) {
				setIsAdmin(true)
			} else {
				setIsAdmin(false);
			}
		})
	}, [userAuth]);

	useEffect(() => {
		dispatch(fetchCategoryAction());
	}, [dispatch]);
	const { categoryList: category, loading, appErr, serverErr } = useSelector(state => state?.category);


	return (
		<>
			<Container>
				{!userAuth ? (
					<div className="flex items-center justify-center h-full">
						<h1 className="text-3xl font-bold text-center text-gray-500">You are not authorized to view this page</h1>
					</div>
				) : loading ? (
					<div className="flex justify-center items-center h-screen">
						<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
					</div>
				) : appErr || serverErr ? (
					<h2 className="text-center text-3xl text-red-600">
						{serverErr} {serverErr}
					</h2>
				) : category?.length <= 0 ? (
					<h2 className="text-center text-3xl text-green-800">
						No category Found
					</h2>
				) : (
					<div className="flex flex-col">
						<div className=" overflow-x-auto pt-5">
							<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
								<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
									<table className="min-w-full divide-y divide-gray-200">
										<thead className="bg-gray-50">
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Author
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Title
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Created At
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Edit
												</th>
											</tr>
										</thead>
										<tbody>
											{category?.map((category, index) => (
												<tr key={index} className="bg-gray-50">
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="flex items-center">
															<div className="flex-shrink-0 h-10 w-10">
																<img
																	className="h-10 w-10 rounded-full"
																	src={category?.user?.profilePhoto}
																	alt="user profile"
																/>
															</div>
															<div className="ml-4">
																<div className="text-sm font-medium text-gray-900">
																	{category?.user?.firstName}{" "}
																	{category?.user?.lastName}
																</div>
																<div className="text-sm text-gray-500">
																	{category?.user?.email}
																</div>
															</div>
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{category.title}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{<DateFormatter date={category?.createdAt} />}
													</td>
													<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
														{
															isAdmin ? (
																<Link to={`/category-update/${category._id}`}>
																	<PencilAltIcon className="h-5 text-indigo-500" />
																</Link>
															) : (
																"Only Admin Edit"
															)
														}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				)}
			</Container>
		</>
	);
};

export default CategoryList;
