import React, { useEffect } from 'react'
import { Container } from '../../components'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../app/slices/posts/postSlices';
import { fetchCategoryAction } from '../../app/slices/category/categorySlice';
import Dropzone from 'react-dropzone'

//Form schema
const formSchema = Yup.object({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	category: Yup.string().required("Category is required"),
	image: Yup.string().required("Image is required"),
});

const PublicPost = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoryAction())
	}, [dispatch])


	const { userAuth } = useSelector(state => state?.users);
	const { loading: postLoading, appErr: postAppErr, serverErr: postServerErr } = useSelector(state => state?.post);
	const { categoryList } = useSelector(state => state?.category);
	//formik
	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			category: "",
			image: "",
		},
		onSubmit: values => {
			dispatch(createPostAction(values));
			// console.log(values);
			formik.resetForm();
			// wait 4 seconds and navigate to live-post
		},
		validationSchema: formSchema,
	});


	return <>
		<Container>
			{!userAuth ? (
				<div className="flex items-center justify-center h-screen">
					<p className="text-2xl font-semibold text-gray-600">Please Login to Create Post</p>
				</div>
			) : (
				<div className=" w-full bg-gray-100 flex flex-col justify-center  px-5">
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<p className="mt-6 text-center text-4xl font-extrabold text-gray-900">
							Create Post
						</p>

						<p className="font-semibold mt-2 text-center text-green-600">
							Lets Write & Change The World
						</p>
					</div>
					<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md lg:max-w-2xl">
						<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
							<form onSubmit={formik.handleSubmit} className="space-y-6">
								<div>
									<label
										htmlFor="title"
										className="block text-sm font-medium text-gray-700"
									>
										Title
									</label>
									<div className="mt-1">
										<input
											id="title"
											name="title"
											onChange={formik.handleChange}
											value={formik.values.title}
											onBlur={formik.handleBlur}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										/>
									</div>
									<div className="text-red-500">
										{formik.touched.title && formik.errors.title}
									</div>
								</div>

								<div>
									<label
										htmlFor="category"
										className="block text-sm font-medium text-gray-700"
									>
										Category
									</label>
									<div className="mt-1">
										<select
											id="category"
											name="category"
											onChange={formik.handleChange}
											value={formik.values.category}
											onBlur={formik.handleBlur}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
										>
											<option value={1}>Select Category</option>
											{
												categoryList && categoryList.map((category) => (
													<option key={category._id} value={category._id}>{category.title}</option>
												))
											}
										</select>
									</div>
								</div>


								<div>
									<label
										htmlFor="description"
										className="block text-sm font-medium text-gray-700"
									>
										Description
									</label>
									<textarea
										id="description"
										name="description"
										onChange={formik.handleChange}
										value={formik.values.description}
										onBlur={formik.handleBlur}
										rows="2"
										cols="10"
										className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-gray-600 bg-transparent focus:bg-transparent  border border-gray-200 focus:border-gray-500  focus:outline-none"
										type="text"
									></textarea>
									<div className="text-red-500">
										{formik.touched.description && formik.errors.description}
									</div>
								</div>
								<Dropzone
									onDrop={(acceptFiles) => {
										formik.setFieldValue('image', acceptFiles[0]);
									}}
									maxSize={5000000}
									multiple={false}
									onBlur={formik.handleBlur('image')}
								>
									{({ getRootProps, getInputProps }) => (
										<section>
											<div
												{...getRootProps()}
												className="w-full flex flex-col items-center px-6 py-1   border-2 border-gray-300 border-dashed rounded-md"
											>
												<input {...getInputProps()} />
												<svg className="w-12 h-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 8v28m16-28v28M6 20h36m-12-8v8m0 4v8"
													/>
												</svg>
												<p className="mt-1 text-sm text-gray-600">
													{formik.values.image ? formik.values.image.name : 'Drag and drop your image here, or click to select image'}
												</p>
												<p className="mt-1 text-xs text-gray-500">
													PNG, JPG up to 5MB
												</p>
											</div>
										</section>
									)}

								</Dropzone>
								<div className="text-red-500 text-sm font-bold">
									dont forget to add the image to your post
									<br />
									<span className="text-purple-500">
										Press Button and wait 4 seconds then redirect to posts page
									</span>
								</div>
								<button
									disabled={postLoading}
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									{postLoading ? "Loading...." : 'Create Post'}
								</button>
							</form>

							{
								postAppErr || postServerErr ? <p className='text-red-400 text-base lg:text-lg mt-3 font-bold'>
									{postServerErr} - {postAppErr}
								</p> : null
							}


						</div>
					</div>
				</div>)
			}
		</Container>
	</>
}

export default PublicPost