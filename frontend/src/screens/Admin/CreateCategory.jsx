import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, fetchCategoryAction } from '../../app/slices/category/categorySlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
});



const CreateCategory = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoryAction());
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			title: '',
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(createCategoryAction(values));
			formik.resetForm();
		},
	});
	const { loading, appErr, serverErr, categoryList:category } = useSelector(state => state?.category);

	return <>
		<div className='w-full h-full  bg-gray-50 p-5 '>
			<h2 className='text-2xl text-center font-bold bg-green-400'>Super Category</h2>
			<div className="flex justify-center flex-col gap-5 flex-wrap">
				<div className='w-full lg:w-8/12 mx-auto  flex flex-col justify-center  bg-white p-4 my-3 rounded-md shadow-lg'>
					<div className='text-3xl text-center font-bold italic '>
						Add New Category
					</div>
					<div>
						<form onSubmit={formik.handleSubmit} className='flex flex-col gap-5'>
							<input
								type='text'
								name='title'
								value={formik.values.title}
								onChange={formik.handleChange('title')}
								onBlur={formik.handleBlur('title')}
								placeholder='Category Name'
								className='border-2 mt-3 border-gray-300 rounded-md p-2'
							/>
							{
								formik.touched.title && formik.errors.title ? (
									<div className='text-red-500 text-center text-lg'>{formik.errors.title}</div>
								) : null
							}
							<button
								type='submit'
								className='bg-green-400 text-white p-2 rounded-md'>
								{
									loading ? (
										<div className='flex justify-center'>
											<div className='animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900'></div> Loading...
										</div>
									) : 'Create New Category'
								}
							</button>

							{
								appErr || serverErr ? <h2 className='text-red-500 text-center text-lg'>{appErr || serverErr}</h2> : null
							}

						</form>

					</div>
				</div>
				<div className='w-full lg:w-8/12 mx-auto flex justify-center  bg-white p-4 my-3 rounded-md shadow-lg flex-col'>
					<div className='text-3xl text-center font-bold italic '>
						Manage Category
					</div>
					<div className='overflow-y-auto  max-h-48'>
						<table className='w-full'>
							<thead>
								<tr>
									<th className='border-b border-gray-200 p-2'>#</th>
									<th className='border-b border-gray-200 p-2'>Category Name</th>
									<th className='border-b border-gray-200 p-2'>Action</th>
								</tr>
							</thead>
							<tbody>
								{
									category?.map((item, index) => (
										<tr key={index} className='text-center'>
											<td className='border-b border-gray-200 p-2'>{index}</td>
											<td className='border-b border-gray-200 p-2'>
												{item.title}
											</td>
											<td className='border-b flex justify-evenly border-gray-200 p-2'>
												<button className='bg-green-400 text-white p-1 rounded-md'>
													Update
												</button>
												<button className='bg-red-400 text-white p-1 rounded-md'>
													Delete
												</button>
											</td>
										</tr>
									))
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default CreateCategory