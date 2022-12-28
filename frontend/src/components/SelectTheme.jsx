import React, { useState } from 'react'

const SelectTheme = () => {
	const [open, setOpen] = useState(false);
	return <>
		<div className="absolute bottom-0 left-24 mb-4 ml-4">
			<div className="relative inline-block text-left">
				<div>
					<button onClick={() => setOpen(!open)} type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="options-menu" aria-haspopup="true" aria-expanded="true">
						White
						<svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
						</svg>
					</button>
				</div>
				<div className={`origin-top-right absolute ${open ? 'block' : 'hidden'}  left-0 bottom-14 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
					<div className="py-1" role="none">
						{/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
						<button className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="options-menu-item-0">Dark</button>
						<button className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="options-menu-item-1">White</button>

					</div>
				</div>
			</div>
		</div>
	</>
}

export default SelectTheme