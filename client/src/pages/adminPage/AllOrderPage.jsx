import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderThunk,clearError,clearMessage } from "../../redux/slice/adminSlice.js";
import DataTable from "../../components/DataTable.jsx";
import { orderColumns } from "../../constant/adminConstant.js";
import Loading from "../../components/Loading.jsx"
import Metadata from "../../components/Metadata.jsx"
import {toast} from "sonner"

const AllOrderPage = () => {
	const dispatch = useDispatch();
	const { allOrders,message,error,loading } = useSelector((state) => state.admin);
	const [rows, setRows] = useState([]);

	useEffect(() => {
		dispatch(getAllOrderThunk());
	}, []);

	useEffect(() => {
	
		if (allOrders.length>0) {

			const tempRow = allOrders.map((order) => {
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
	}, [allOrders]);

	useEffect(()=>{
	if(message){
		toast.success(message)
		dispatch(clearMessage())
	}

if(error){
	toast.error(error.message);
	dispatch(clearError())
}

},[error,message])


	return <>
	<Metadata tittle="All Orders - Admin Panel"/>
			<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-xl pb-2 mb-4 lg:hidden">
							Orders
					</h1>
			{loading && <Loading />}
			<DataTable colInfo={orderColumns} rowInfo={rows} />
		</>
};

export default AllOrderPage;
