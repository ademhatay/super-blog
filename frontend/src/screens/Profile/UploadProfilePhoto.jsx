import { UploadIcon } from "@heroicons/react/outline";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { uploadProfilePhotoAction } from "../../app/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components";


const formSchema = Yup.object({
	image: Yup.string().required("Image is required"),
});

export default function UploadProfilePhoto() {

	const navigate = useNavigate();

	const dispatch = useDispatch();
	//formik
	const formik = useFormik({
		initialValues: {
			image: "",
		},
		onSubmit: values => {
			dispatch(uploadProfilePhotoAction(values));
			formik.resetForm();
			setTimeout(() => {
				navigate(`/dashboard`)
			}, 2000)
		},
		validationSchema: formSchema,
	});
	//store data
	const users = useSelector(state => state?.users);
	const {  loading, appErr, serverErr } = users;


	return (
		<Container>
			<div className="h-full bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
						Upload profile photo
					</h2>
					{/* Displya err here */}
				</div>

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" onSubmit={formik.handleSubmit}>
							{/* Image container here thus Dropzone */}
							{appErr || serverErr ? (
								<h2 className="text-center text-red-500">
									{serverErr} {appErr}
								</h2>
							) : null}
							<div className="">
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
							</div>

							<div className="text-red-500">
								{formik.touched.image && formik.errors.image}
							</div>
							<p className="text-sm text-gray-500">
								PNG, JPG, GIF minimum size 400kb uploaded only 1 image
							</p>

							<div>
								{loading ? (
									<button
										disabled
										className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-500 "
									>
										<UploadIcon
											className="-ml-1 mr-2 h-5  text-gray-400"
											aria-hidden="true"
										/>
										<span>Loading Please wait...</span>
									</button>
								) : (
									<button
										type="submit"
										className="inline-flex justify-center w-full px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
									>
										<UploadIcon
											className="-ml-1 mr-2 h-5  text-gray-400"
											aria-hidden="true"
										/>
										<span>Upload Photo</span>
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</Container>
	);
}
