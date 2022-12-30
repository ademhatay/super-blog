import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../app/slices/category/categorySlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
});



const CreateCategory = () => {

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			title: '',
		},
		validationSchema,
		onSubmit: (values) => {
			dispatch(createCategoryAction(values));
		},
	});


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
							<button
								type='submit'
								className='bg-green-400 text-white p-2 rounded-md'>
								Add Category
							</button>
							{
								formik.touched.title && formik.errors.title ? (
									<div className='text-red-500 text-center text-lg'>{formik.errors.title}</div>
								) : null
							}
						</form>

					</div>
				</div>
				<div className='w-full lg:w-8/12 mx-auto flex justify-center  bg-white p-4 my-3 rounded-md shadow-lg flex-col'>
					<div className='text-3xl text-center font-bold italic '>
						Manage Category
					</div>
					<div>
						<table className='w-full'>
							<thead>
								<tr>
									<th className='border-b border-gray-200 p-2'>#</th>
									<th className='border-b border-gray-200 p-2'>Category Name</th>
									<th className='border-b border-gray-200 p-2'>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr className='text-center'>
									<td className='border-b border-gray-200 p-2'>1</td>
									<td className='border-b border-gray-200 p-2'>Category Name 1</td>
									<td className='border-b flex justify-evenly border-gray-200 p-2'>
										<button className='bg-green-400 text-white p-1 rounded-md'>
											Update
										</button>
										<button className='bg-red-400 text-white p-1 rounded-md'>
											Delete
										</button>
									</td>
								</tr>

								<tr className='text-center'>
									<td className='border-b border-gray-200 p-2'>2</td>
									<td className='border-b border-gray-200 p-2'>Category Name 2</td>
									<td className='border-b flex justify-evenly border-gray-200 p-2'>
										<button className='bg-green-400 text-white p-1 rounded-md'>
											Update
										</button>
										<button className='bg-red-400 text-white p-1 rounded-md'>
											Delete
										</button>
									</td>
								</tr>

								<tr className='text-center'>
									<td className='border-b border-gray-200 p-2'>3</td>
									<td className='border-b border-gray-200 p-2'>Category Name 3</td>
									<td className='border-b flex justify-evenly border-gray-200 p-2'>
										<button className='bg-green-400 text-white p-1 rounded-md'>
											Update
										</button>
										<button className='bg-red-400 text-white p-1 rounded-md'>
											Delete
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</>
}

export default CreateCategory