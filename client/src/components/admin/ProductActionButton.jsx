import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { deleteProductThunk } from "../../redux/slice/adminSlice.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const ProductActionButton = ({ id }) => {
	const dispatch = useDispatch();
	return (
		<div className="text-xl text-red-600 flex gap-4">
			<Link to={`/admin/product/${id}`}>
				<MdEdit />
			</Link>
			<div
				className="cursor-pointer"
				onClick={() => {
					dispatch(deleteProductThunk(id));
				}}
			>
				<MdDeleteForever />
			</div>
		</div>
	);
};

export default ProductActionButton;
