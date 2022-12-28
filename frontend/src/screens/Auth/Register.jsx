import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from '../../app/slices/users/usersSlices';
import { useEffect } from 'react';

// Register form validation schema

const validationSchema = Yup.object({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().email('Invalid email format').required('Email is required'),
	password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const Register = () => {

	// Redux dispatch
	const dispatch = useDispatch();

	// Redux state
	const { loading, appErr, serverErr, registered } = useSelector(state => state?.users);


	// navigate
	const navigate = useNavigate();

	// Redirect to dashboard if user is already logged in
	useEffect(() => {
		if (registered) {
			alert('User registered successfully, you can now login');
			navigate('/auth/login');
		}
	}, [registered, navigate])


	// Formik form state and methods
	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: ''
		},
		validationSchema,
		onSubmit: values => {
			try {
				dispatch(registerUserAction(values));
			} catch (error) {
				console.log(error);
			}
			formik.resetForm();
		}
	});

	return <>
		<div className='w-full lg:w-1/2 h-full shadow-2xl flex flex-col justify-center  items-center pt-5'>
			<h1 className='text-4xl font-bold'>Register</h1>
			<p className='text-gray-400 text-center my-3'>
				Create an Account <br /> Already have an account? <Link to="/auth/login" className='text-blue-400 font-semibold'>Sign Up</Link>
			</p>
			<form className='w-full'>
				<div className="input-group flex my-3 flex-col items-center">
					<input
						className='w-10/12 lg:w-1/2 border-2 rounded-md p-3'
						type="text"
						placeholder='First Name'
						name='firstName'
						value={formik.values.firstName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<p className='text-red-400 text-sm lg:text-base'>
						{formik.touched.firstName && formik.errors.firstName}
					</p>
				</div>
				<div className="input-group flex my-3 flex-col items-center">
					<input
						className='w-10/12 lg:w-1/2 border-2 rounded-md p-3'
						type="text"
						placeholder='Last Name'
						name='lastName'
						value={formik.values.lastName}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<p className='text-red-400 text-sm lg:text-base'>
						{formik.touched.lastName && formik.errors.lastName}
					</p>
				</div>
				<div className="input-group flex my-3 flex-col items-center">
					<input
						className='w-10/12 lg:w-1/2 border-2 rounded-md p-3'
						type="email"
						placeholder='Email'
						name='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
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
						name='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/>
					<p className='text-red-400 text-sm lg:text-base'>
						{formik.touched.password && formik.errors.password}
					</p>
				</div>
				<div className="input-group flex my-3 flex-col items-center">
					<button
						type='submit'
						onClick={formik.handleSubmit}
						className='border w-10/12 lg:w-1/2 py-2 rounded-lg bg-orange-400 text-white font-bold'>
						{
							loading ? <div className='flex justify-center items-center'>
								<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
									<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
								</svg>
								Loading...
							</div> : 'Register'

						}
					</button>
					{
						appErr || serverErr ? <p className='text-red-400 text-base lg:text-lg mt-3 font-bold'>
							{serverErr} - {appErr}
						</p> : null
					}
				</div>
			</form>
		</div>
	</>
}

export default Register