import React from "react";
import "chart.js/auto";
import { Line } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';




function DashboardPage() {
	
	const lineData={
		labels: ['Initial Amount','Amount Earned'],
      datasets: [{
        label: 'Total Amount',
        data: [0,4000],
       borderColor:'#ff6347'
      }]
    }
   const DoughnutData={
   	labels:["Out of Stock","In Stock"],
   	datasets:[{
   		backgroundColor:['#00A6B4','#6800B4'],
   		data:[2,4]
   	}]
   }
	
	return (
		<>
			<div className="h-50px bg-blue-400 text-white flex flex-col justify-center items-center">
				<p>totoal amouunt</p>
				<p>$2000</p>
			</div>
			<div className="flex  flex-col items-center justify-center gap-5 mt-10 lg:flex-row">
				<div className="h-[200px] w-[200px] rounded-full bg-red-400 text-white flex items-center justify-center flex-col text-xl">
					<p>Product</p>
					<p>50</p>
				</div>
				<div className="h-[200px] w-[200px] rounded-full bg-yellow-400 text-white flex items-center justify-center flex-col text-xl">
					<p>Order</p>
					<p>10</p>
				</div>
				<div className="h-[200px] w-[200px] rounded-full bg-green-400 text-white flex items-center justify-center flex-col text-xl">
					<p>User</p>
					<p>5</p>
				</div>
			</div>
			<div className="mt-12 pl-3 w-full lg:w-10/12 mx-auto ">
			<Line data={lineData}/>
			</div>
			<div className="mt-10 pl-3 w-full lg:w-6/12 mx-auto">
				<Doughnut data={DoughnutData}/>
			</div>
		</>
	);
}

export default DashboardPage;
