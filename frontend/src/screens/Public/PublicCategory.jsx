import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../app/slices/category/categorySlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Container } from '../../components';
import { Link } from 'react-router-dom';

const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
});



const PublicCategory = () => {

	const dispatch = useDispatch();

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

	const { loading, appErr, serverErr } = useSelector(state => state?.category);





	return <>
		<Container>
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
							Category List
						</div>
						<div className='overflow-y-auto  max-h-48'>
							<table className='w-full'>
								<thead>
									<tr>
										<th className='border-b border-gray-200 p-2'>#</th>
										<th className='border-b border-gray-200 p-2'>Category Name</th>
									</tr>
								</thead>
								<tbody>
									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>

									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>

									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>

									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>

									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>
									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>
									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>
									<tr className='text-center'>
										<td className='border-b border-gray-200 p-2'>1</td>
										<td className='border-b border-gray-200 p-2'>Category Name 1</td>

									</tr>



								</tbody>
							</table>
						</div>
					</div>
					<Link className='text-center text-2xl text-white bg-orange-400 p-2 rounded-md' to='/'>Back to Home</Link>
				</div>
			</div>
		</Container>
	</>
}

export default PublicCategory