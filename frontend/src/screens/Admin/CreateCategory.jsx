import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction, fetchCategoryAction } from '../../app/slices/category/categorySlice';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/isAdmin';

const validationSchema = Yup.object({
	title: Yup.string().required('Title is required'),
});



const CreateCategory = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isAdmin, setIsAdmin] = useState(false);
	const { userAuth } = useSelector(state => state?.users);

	useEffect(() => {
		getUser(userAuth).then((res) => {
			if (res) {
				setIsAdmin(res?.isAdmin)
			} else {
				setIsAdmin(false)
				navigate('/dashboard')
			}
		})
	}, [userAuth]);

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
			navigate('/admin/manage-category');
		},
	});
	const { loading, appErr, serverErr, categoryList: category } = useSelector(state => state?.category);

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
			</div>
		</div>
	</>
}

export default CreateCategory