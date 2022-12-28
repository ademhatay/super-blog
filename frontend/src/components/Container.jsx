import React from 'react'
import Navbar from './Navbar/Navbar'

const Container = ({ children }) => {
	return <>
		<Navbar />
		<div>
			{children}
		</div>
		<div>
			Footer
		</div>
	</>
}

export default Container