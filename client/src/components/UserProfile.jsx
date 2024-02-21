import React, { useState } from "react";
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from "@mui/material";
import Profile from "../images/Profile.png";
import { CgProfile } from "react-icons/cg";
import { FaRegListAlt } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { SlLogin } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogoutThunk } from "../redux/slice/userSlice.js";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const Close = (reason) => {
		if (reason === "toggle") {
			console.log("hi");
			setShow(false);
		}
	};
	const Open = (reason) => {
		if (reason === "toggle") {
			setShow(true);
		}
	};
	const navigateProfile = () => {
		setShow(false);
		navigate("/user/account");
	};
	const navigateOrder = () => {
		setShow(false);
		navigate("/user/order");
	};
	const handelLogout = () => {
		setShow(false);
		dispatch(userLogoutThunk());
		navigate("/", { replace: true });
	};
	const handelLogin = () => {
		navigate("/login");
		setShow(false);
	};

	const options = [
		{
			icon: <CgProfile className="text-2xl text-black" />,
			tooltip: "Profile",
			fun: navigateProfile,
		},
		{
			icon: <FaRegListAlt className="text-black text-xl" />,
			tooltip: "Order",
			fun: navigateOrder,
		},
		{
			icon: <GrLogout className="text-black text-xl" />,
			tooltip: "Logout",
			fun: handelLogout,
		},
	];

	return (
		<>
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				sx={{
					"& .MuiFab-primary": {
						width: 36,
						height: 36,
						backgroundColor: "transparent",
					},
					position: "relative",
					top: "12px",
				}}
				icon={
					<img
						src={user ? user.user.avtar : Profile}
						alt=""
						className="h-[36px] w-[36px] rounded-[50%] object-cover z-40"
					/>
				}
				onClose={(e, reason) => Close(reason)}
				onOpen={(e, reason) => Open(reason)}
				open={show}
				direction="down"
			>
				{user ? (
					options.map((option) => (
						<SpeedDialAction
							icon={option.icon}
							tooltipTitle={option.tooltip}
							onClick={option.fun}
						/>
					))
				) : (
					<SpeedDialAction
						icon={<SlLogin className="text-xl text-black" />}
						tooltipTitle="Login"
						onClick={handelLogin}
					/>
				)}
			</SpeedDial>
		</>
	);
};

export default UserProfile;
