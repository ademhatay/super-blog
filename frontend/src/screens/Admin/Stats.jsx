import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const userData = {
	labels: ['Users'],
	datasets: [
		{
			label: '# of Users',
			data: [12],
			backgroundColor: [
				'rgba(255, 159, 64, 0.5)',
			],
			borderColor: [
				'rgba(255, 159, 64, 1)',
			],
			borderWidth: 1,
		},
	],
};

export const postData = {
	labels: ['Posts'],
	datasets: [
		{
			label: '# of Posts',
			data: [74],
			backgroundColor: [
				'rgba(15, 159, 64, 0.5)',
			],
			borderColor: [
				'rgba(15, 159, 64, 1)',
			],
			borderWidth: 1,
		},
	],
};

export const commentsData = {
	labels: ['Comments'],
	datasets: [
		{
			label: '# of Comments',
			data: [36],
			backgroundColor: [
				'rgba(255, 15, 200, 0.5)',
			],
			borderColor: [
				'rgba(255, 15, 200, 1)',
			],
			borderWidth: 1,
		},
	],
};


const Stats = () => {
	return <>
		<div className='w-full h-full   bg-gray-50 p-5 '>
			<h2 className='text-2xl text-center font-bold bg-green-400'>Super Stats</h2>
			<div className="flex justify-center items-center  flex-col gap-5 lg:flex-row flex-wrap">
				<div className='w-full lg:w-3/12 flex justify-center  bg-white p-4 my-3 rounded-md shadow-lg'>
					<Doughnut data={userData} />
				</div>
				<div className='w-full lg:w-3/12 flex justify-center  bg-white p-4 my-3 rounded-md shadow-lg flex-col'>
					<Doughnut data={postData} />
				</div>
				<div className='w-full lg:w-3/12 flex justify-center  bg-white p-4 my-3 rounded-md shadow-lg flex-col'>
					<Doughnut data={commentsData} />
				</div>
			</div>
		</div>
	</>
}

export default Stats