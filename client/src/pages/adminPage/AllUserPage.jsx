import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllUserThunk,
	clearMessage,
	clearError,
} from "../../redux/slice/adminSlice.js";
import DataTable from "../../components/DataTable.jsx";
import { userColumns } from "../../constant/adminConstant.js";
import Loading from "../../components/Loading.jsx";
import Metadata from "../../components/Metadata.jsx"
import { toast } from "sonner";

const AllUserPage = () => {
	const dispatch = useDispatch();
	const { users, message, error, loading } = useSelector(
		(state) => state.admin,
	);
	const [row, setRow] = useState([]);



	useEffect(() => {
		if (users.length > 0) {
			const tempRow = users.map((user) => {
				return {
					id: user._id,
					userId: user._id,
					name: user.fullname,
					email: user.email,
					role: user.role,
				};
			});

			setRow(tempRow);
		}
		else{

			setRow([]);
		}
	}, [users]);

	useEffect(() => {
		if (message) {
			toast.success(message);
			dispatch(clearMessage());
		}

		if (error) {
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error, message]);

	return (
		<>
			<Metadata tittle="All Users - Admin Panel"/>		
		<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-xl pb-2 mb-4 lg:hidden">
							Users
					</h1>
			{loading && <Loading />}
			<DataTable colInfo={userColumns} rowInfo={row} />
		</>
	);
}

export default AllUserPage