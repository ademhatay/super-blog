import React from 'react'
import Navbar from './Navbar'

const Container = ({ children }) => {
	return <>
		<Navbar />
		<div className='h-screen pt-14 lg:pt-20'>
			{children}
		</div>
	</>
}

export default Container