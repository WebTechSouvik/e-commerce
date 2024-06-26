import React, { useState } from "react";
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from "@mui/material";
import Profile from "../images/Profile.png";
import { CgProfile } from "react-icons/cg";
import { FaRegListAlt } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { SlLogin } from "react-icons/sl";
import { GrUserAdmin } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLogoutThunk } from "../redux/slice/userSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



const UserProfile = () => {
	const user = useSelector((state) => state.user.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const Close = (reason) => {
		if (reason === "mouseLeave" || "toggle") {
			console.log("hi");
			setShow(false);
		}
	};
	const Open = (reason) => {
		if (reason === "mouseEnter" || "toggle") {
			setShow(true);
		}
	};
	const navigateProfile = () => {
		setShow(false);
		navigate("/user/account");
	};
	const navigateOrder = () => {
		setShow(false);
		navigate("/order/me");
	};
	const handelLogout = () => {
		setShow(false);
		dispatch(userLogoutThunk());
		navigate("/", { replace: true });
		toast.success("Logout sucessfull");
	};
	const handelLogin = () => {
		navigate("/login");
		setShow(false);
	};
	const handelAdmin = () => {
		navigate("/admin/dashboard");
		setShow(false);
	};

	const options = [
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
		{
			icon: <GrUserAdmin className="text-black text-xl" />,
			tooltip: "Admin",
			fun: handelAdmin,
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
					top: user?.role == "admin" ? "92px" : "64px",
				}}
				icon={
					<img
						src={user?.avtar?.url ? user.avtar.url : Profile}
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
					options.map((option) => {
						if (user?.role == "admin") {
							return (
								<SpeedDialAction
									icon={option.icon}
									tooltipTitle={option.tooltip}
									onClick={option.fun}
								/>
							);
						} else {
							if (option.tooltip !== "Admin") {
								console.log("hi");

								return (
									<SpeedDialAction
										icon={option.icon}
										tooltipTitle={option.tooltip}
										onClick={option.fun}
									/>
								);
							}
						}
					})
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
