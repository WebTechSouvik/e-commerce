import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Protected = () => {
	const { isAuthinticated, loading } = useSelector((state) => state.user);

	// const authinticate=true

	return loading ? (
		<div className="w-screen h-screen flex justify-center items-center">
			<CircularProgress size={80} />
		</div>
	) : isAuthinticated ? (
		<Outlet />
	) : (
		<Navigate to="/login" />
	);
};

export default Protected;
