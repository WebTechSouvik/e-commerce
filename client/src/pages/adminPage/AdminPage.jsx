import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar.jsx";
import { useDispatch } from "react-redux";
import { getAllOrderThunk } from "../../redux/slice/adminSlice.js";
import { getAdminProductThunk } from "../../redux/slice/adminSlice.js";
import { getAllUserThunk } from "../../redux/slice/adminSlice.js";

const AdminPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllUserThunk());
		dispatch(getAllOrderThunk());
		dispatch(getAdminProductThunk());
	}, []);

	return (
		<div className="mt-28  lg:px-5">
			{/*<h3 className="border-b border-solid  border-black w-max m-auto px-5 text-xl pb-1 hidden lg:block">
				Admin Panel
			</h3>*/}
			<div className="lg:grid grid-cols-4">
				<AdminSideBar />
				<div className="overflow-x-scroll px-2 min-h-screen lg:col-span-4  lg:overflow-hidden lg:ml-[260px] xl:ml-[337px] ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
