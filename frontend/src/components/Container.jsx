import React from 'react'
import Navbar from './Navbar'

const Container = ({ children }) => {
	return <>
		<Navbar />
		<div>
			{children}
		</div>
	</>
}

export default Container