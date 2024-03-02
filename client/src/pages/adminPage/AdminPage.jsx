import React from "react";
import { Outlet } from "react-router-dom";
import AdminSideBar from "../../components/admin/AdminSideBar.jsx";

const AdminPage = () => {
	return (
		<div className="mt-28  lg:px-5">
			{/*<h3 className="border-b border-solid  border-black w-max m-auto px-5 text-xl pb-1 hidden lg:block">
				Admin Panel
			</h3>*/}
			<div className="lg:grid grid-cols-4 ">
				<AdminSideBar />
				<div className="lg:col-span-4 mt-5 lg:mt-0 lg:ml-[337px] lg:px-5">
				<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AdminPage;
