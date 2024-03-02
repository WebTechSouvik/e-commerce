import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet,useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Protected = ({isadmin}) => {
	const navigate=useNavigate()
	const { user,isAuthinticated, loading } = useSelector((state) => state.user);

	
	if(loading){
		return <div className="w-screen h-screen flex justify-center items-center">
			<CircularProgress size={80} />
		</div>
	}
	else{
		if(isadmin && isAuthinticated && user.role=="admin"){
			return <Outlet />
		}
		else if(isadmin && isAuthinticated && user.role=="user"){
			navigate(-1);
		}
		 else if(!isadmin && isAuthinticated ){
			return <Outlet />
		}
		else
			return <Navigate to="/login" />
	}

	
};

export default Protected;
