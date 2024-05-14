import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteOrderThunk } from "../../redux/slice/adminSlice.js";
import { useDispatch } from "react-redux";

const OrderActionButton = ({ id }) => {
	const dispatch = useDispatch();
	return (
		<div className="text-xl text-red-600 flex gap-4">
			<Link to={`/order/${id}`}>
				<MdEdit />
			</Link>
			<div
				onClick={() => {
					dispatch(deleteOrderThunk(id));
				}}
				className="cursor-pointer"
			>
				<MdDeleteForever />
			</div>
		</div>
	);
};

export default OrderActionButton;
