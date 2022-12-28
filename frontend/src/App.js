import React from 'react'
import Lottie from "lottie-react";
import groovyWalkAnimation from "./assets/world.json";
import { Link } from 'react-router-dom';

const App = () => {

	return <>
		<section className="w-screen h-screen max-h-screen bg-gray-800 flex flex-col lg:flex-row">
			<div className="max-w-full lg:w-2/3 flex flex-col justify-evenly items-center px-4 lg:px-0">
				<h1 className="text-4xl lg:text-8xl font-semibold text-orange-500">Write <span className='text-2xl'>&</span> Share</h1>
				<div className='text-2xl lg:text-3xl text-white text-center'>
					<p className='text-2xl lg:text-4xl mb-5'>
						<span className='text-orange-500'>Create </span>
						your post and share it with the <span className='bg-orange-500'>world</span>!
					</p>
					<p className='text-2xl lg:text-4xl my-5'>
						<span className='text-green-500'>Change </span>
						the <span className='bg-orange-500'>world</span> with your ideas!
					</p>
					<p className='text-2xl lg:text-4xl mt-5'>
						<span className='text-blue-500'>Upgrading </span>
						your skills and change the <span className='bg-orange-500'>world</span>!
					</p>
					<p className='text-2xl lg:text-4xl mt-5'>
						<span className='text-purple-500'>Discover, Enjoy & Write, </span>
						this <span className='bg-orange-500'>world</span> different!
					</p>
					<p className='text-2xl lg:text-4xl my-5'>
						<span className='text-red-500'>Join </span>
						the <span className='bg-orange-500'>world</span> of <span className='text-orange-500'>Write & Share</span>!
					</p>
				</div>
			</div>
			<div className="w-full lg:w-1/3 h-full flex flex-col items-center bg-blue-900 pt-10 justify-between">
				<div className="w-full h-auto flex justify-center">
					<Link to="/auth" className='w-10/12 py-2 rounded-lg bg-orange-400 text-white font-bold text-center'>
						Dive In Now!
					</Link>
				</div>
				<Lottie animationData={groovyWalkAnimation} loop={true} />
			</div>
		</section>
	</>
}

export default App