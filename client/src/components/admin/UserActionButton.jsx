import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { deleteUserThunk } from "../../redux/slice/adminSlice.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const UserActionButton = ({ id }) => {
	const dispatch = useDispatch();
	return (
		<div className="text-xl text-red-600 flex gap-4">
			<div
				className="cursor-pointer"
				onClick={() => {
					dispatch(deleteUserThunk(id));
				}}
			>
				<MdDeleteForever />
			</div>
		</div>
	);
};

export default UserActionButton;
