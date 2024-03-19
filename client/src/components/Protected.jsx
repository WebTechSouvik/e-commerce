import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet,useNavigate } from "react-router-dom";
import Loading from "./Loading.jsx"

const Protected = ({isadmin}) => {
	const navigate=useNavigate()
	const { user,isAuthinticated, loading } = useSelector((state) => state.user);

	
	if(loading){
		return <Loading/>
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
