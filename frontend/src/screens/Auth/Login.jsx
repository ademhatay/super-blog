import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { loginUserAction } from '../../app/slices/users/usersSlices'
import { useDispatch, useSelector } from 'react-redux'

const validationSchema = Yup.object({
	email: Yup.string().email('Invalid email format').required('Email is required'),
	password: Yup.string().required('Password is required')
});


const Login = () => {

	// Redux dispatch
	const dispatch = useDispatch();

	// Redux state
	const { loading, appError, serverError, user } = useSelector(state => state?.users);


	// Formik form state and methods
	const formik = useFormik({
		initialValues: {
			email: 'adem@123.com',
			password: '123456'
		},
		validationSchema,
		onSubmit: values => {
			dispatch(loginUserAction(values));
			formik.resetForm();
		}
	});


	return <>
		<div className='w-full lg:w-1/2 h-full shadow-2xl flex flex-col justify-center items-center pt-5'>
			<h1 className='text-4xl font-bold'>Login</h1>
			<p className='text-gray-400 text-center my-3'>
				Login your account <br /> I dont have account <Link to="/auth/register" className='text-blue-400 font-semibold'>Create Account</Link>
			</p>
			<form className='w-full'>
				<div className="input-group flex my-3 flex-col items-center">
					<input
						className='w-10/12 lg:w-1/2 border-2 rounded-md p-3'
						type="email"
						placeholder='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='email'
					/>
					<p className='text-red-400 text-sm lg:text-base'>
						{formik.touched.email && formik.errors.email}
					</p>
				</div>
				<div className="input-group flex my-3 flex-col items-center">
					<input
						className='w-10/12 lg:w-1/2 border-2 rounded-md p-3'
						type="password"
						placeholder='Password'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						name='password'
					/>
					<p className='text-red-400 text-sm lg:text-base'>
						{formik.touched.password && formik.errors.password}
					</p>
				</div>
				<div className="input-group flex my-3 flex-col items-center">
					<button
						onClick={formik.handleSubmit}
						type='submit'
						className='border w-10/12 lg:w-1/2 py-2 rounded-lg bg-orange-400 text-white font-bold'>
						{
							loading ? <div className='flex justify-center items-center'>
								<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
								</svg>
								Loading...
							</div> : 'Dive In Real World!'

						}
					</button>
					{
						appError || serverError ? <p className='text-red-400 text-base lg:text-lg mt-3 font-bold'>
							{serverError} - {appError}
						</p> : null
					}
				</div>
			</form>
		</div>
	</>
}

export default Login