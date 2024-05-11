import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/ContentWrapper.jsx";
import DataTable from "../../components/DataTable.jsx";
import { columns } from "../../constant/orderConstant.js";
import { getMyOrderThunk } from "../../redux/slice/orderSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Metadata from "../../components/Metadata.jsx"

const OrderPage = () => {
	const { userOrders } = useSelector((state) => state.order);
	const [rows, setRows] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMyOrderThunk());
	}, []);

	useEffect(() => {
		if (userOrders.length > 0) {
			const tempRow = userOrders.map((order) => {
				return {
					id: order._id,
					ordertId: order._id,
					status: order.orderStatus,
					itemQty: order.orderItems.reduce(
						(accu, item) => accu + item.quantity,
						0,
					),
					amount: order.totalPrice,
				};
			});

			setRows(tempRow);
		}
	}, [userOrders]);

	return (
		 
			<>
			<Metadata tittle="Orders - Ecommerce"/>
				<div className=" mt-[100px] min-h-screen">
					<h3 className="border-b border-solid  border-black w-max mx-auto px-5 text-xl pb-1  translate-x-[-14px] my-6">
						My Orders
					</h3>
					<div className="overflow-x-scroll px-10 lg:overflow-hidden">
					<DataTable colInfo={columns} rowInfo={rows} />
					</div>
				</div>
			</>
		
	);
};

export default OrderPage;
