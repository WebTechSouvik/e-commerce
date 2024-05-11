import React, { useState, useEffect } from "react";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import Metadata from "../../components/Metadata.jsx";
import { useSelector } from "react-redux";
import { PiCurrencyInrBold } from "react-icons/pi";

function DashboardPage() {
	const { products, allOrders, users } = useSelector((state) => state.admin);
	const [totalAmount, setTotalAmount] = useState(0);
	const [outOfStock, setOutOfStock] = useState(0);

	useEffect(() => {
		if (allOrders) {
			const total = allOrders.reduce((acc, Order) => acc + Order.totalPrice, 0);
			setTotalAmount(total);
		}

		if (products) {
			const totalOutOfStock = products.reduce((outOfStock, product) => {
				if (product.stock == 0) {
					return (outOfStock += 1);
				}
			}, 0);

			if (totalOutOfStock) setOutOfStock(totalOutOfStock);
		}
	}, [allOrders, products]);

	const lineData = {
		labels: ["Initial Amount", "Amount Earned"],
		datasets: [
			{
				label: "Total Amount",
				data: [0, totalAmount],
				borderColor: "#ff6347",
			},
		],
	};
	const DoughnutData = {
		labels: ["Out of Stock", "In Stock"],
		datasets: [
			{
				backgroundColor: ["#00A6B4", "#6800B4"],
				data: [outOfStock, products?.length - outOfStock],
			},
		],
	};

	return (
		<>
			<Metadata tittle="Dashboard - Admin Panel" />
			<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-xl pb-2 mb-4 lg:hidden">
				Dashboard
			</h1>
			<div className="h-50px bg-blue-400 text-white flex flex-col justify-center items-center">
				<p>totoal amouunt</p>
				<p className="flex items-center">
					<span>
						<PiCurrencyInrBold />
					</span>
					{totalAmount}
				</p>
			</div>
			<div className="flex  flex-col items-center justify-center gap-5 mt-10 lg:flex-row">
				<div className="h-[200px] w-[200px] rounded-full bg-red-400 text-white flex items-center justify-center flex-col text-xl">
					<p>Product</p>
					<p>{products && products.length}</p>
				</div>
				<div className="h-[200px] w-[200px] rounded-full bg-yellow-400 text-white flex items-center justify-center flex-col text-xl">
					<p>Order</p>
					<p>{allOrders && allOrders.length}</p>
				</div>
				<div className="h-[200px] w-[200px] rounded-full bg-green-400 text-white flex items-center justify-center flex-col text-xl">
					<p>User</p>
					<p>{users && users.length}</p>
				</div>
			</div>
			<div className="mt-12 pl-3 w-full lg:w-10/12 mx-auto ">
				<Line data={lineData} />
			</div>
			<div className="mt-10 pl-3 w-full lg:w-6/12 mx-auto">
				<Doughnut data={DoughnutData} />
			</div>
		</>
	);
}

export default DashboardPage;
