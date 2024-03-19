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
import { toast } from "sonner";

const AllUserPage = () => {
	const dispatch = useDispatch();
	const { users, message, error, loading } = useSelector(
		(state) => state.admin,
	);
	const [row, setRow] = useState([]);

	useEffect(() => {
		dispatch(getAllUserThunk());
	}, []);

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
			{loading && <Loading />}
			<DataTable colInfo={userColumns} rowInfo={row} />
		</>
	);
}

export default AllUserPage