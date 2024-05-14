import React, { useState } from "react";
import logo from "../../images/logo.png";
import Profile from "../../images/Profile.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import UserProfile from "../UserProfile.jsx";
import MobileSideBar from "../MobileSideBar.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogoutThunk } from "../../redux/slice/userSlice.js";
import "./style.css";

const Header = () => {
	const { isAuthinticated, message, error } = useSelector(
		(state) => state.user,
	);
	const [keyword, setKeyword] = useState("");
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();


	const handelScearch = () => {
		if (keyword) {
			navigate(`/Products/Scearch/${keyword}`);
			setKeyword("");
		}
		setOpen(false);
	};

	const handelClose = () => {
		setOpen(false);
		setKeyword(null);
	};

	return (
		<div className="flex h-16  shadow-xl fixed top-0 left-0 w-screen backdrop-blur-md z-10 justify-between ">
			<div className="flex gap-2">
				<MobileSideBar icon={<GiHamburgerMenu />}>
					<div className="w-2/3 -translate-y-7 -translate-x-3">
						<img
							src={logo}
							alt=""
							className="w-full object-contain"
						/>
					</div>
					<ul className="flex flex-col gap-14 text-lg pl-5 font-semibold -translate-y-8  font-['Josefin_Sans','sans-serif']">
						<li className="hover:text-[#ff6347]  transition-all duration-300 ease-out flex gap-2">
							<FaHome className="translate-y-[2px]" />
							<Link to="/">Home</Link>
						</li>
						<li className="hover:text-[#ff6347] transition-all duration-300 ease-out flex gap-2">
							<MdOutlineProductionQuantityLimits className="translate-y-[2px]" />
							<Link to="/Products">Product</Link>
						</li>
						<li className="hover:text-[#ff6347] transition-all duration-300 ease-out flex gap-2">
							<FaPhoneVolume className="translate-y-[2px]" />
							<Link>Contact</Link>
						</li>
						<li className="hover:text-[#ff6347] transition-all duration-300 ease-out flex gap-1">
							<IoIosContact className="translate-y-[1px] text-[22px]" />
							<Link>About</Link>
						</li>
					</ul>
					<div className="flex absolute bottom-3 gap-2 w-full justify-center">
						{!isAuthinticated?<><div className="flex gap-2 items-center">
							<CgProfile />
							<Link to="/register" className="text-[#ff6347]">
								Create a account
							</Link>
						</div>
						<span>or</span>
						<div className="flex gap-2 items-center">
							<SlLogin />
							<Link to="/login" className="text-[#ff6347]">
								Sing in
							</Link>
						</div></>:<div className="flex gap-2 items-center">
							<GrLogout />
							<button onClick={()=>dispatch(userLogoutThunk())} className="text-[#ff6347]">
								Log Out
							</button>
						</div>}
					</div>
				</MobileSideBar>
				<div className="h-full relative -z-10 right-7 w-[170px] md:w-[300px]">
					<img
						src={logo}
						alt=""
						className="h-full w-full object-cover"
					/>
				</div>
			</div>
			<div className="flex  items-center  lg:gap-[50px] ">
				<ul className="lg:flex gap-14 text-lg font-semibold font-['Josefin_Sans','sans-serif'] hidden ">
					<li className="hover:text-[#ff6347]  transition-all duration-300 ease-out">
						<Link to="/">Home</Link>
					</li>
					<li className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link to="/Products">Product</Link>
					</li>
					<li className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link>Contact</Link>
					</li>
					<li className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link>About</Link>
					</li>
					<li className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link></Link>
					</li>
				</ul>

				<div className="flex pr-4 gap-5 items-center justify-between relative  text-[22px] lg:text-[24px] lg:gap-8 lg:pr-6">
					<div className=" hidden flex items-center border-b border-solid border-black sm:flex lg:hidden xl:flex">
						<input
							type="text"
							name=""
							id=""
							placeholder="Search here...."
							className="bg-transparent border-none focus:ring-0"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						/>
						<FaSearch
							className="text-gray-400 cursor-pointer"
							onClick={handelScearch}
						/>
					</div>
					<div
						className="sm:hidden lg:block xl:hidden"
						onClick={() => setOpen(true)}
					>
						<FaSearch className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" />
					</div>
					<Link to="/cart">
						<FaCartPlus className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" />
					</Link>
					{!isAuthinticated ? (
						<Link to="/login" className="flex gap-2">
							{" "}
							<CgProfile className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" />
							<span className="hidden lg:block text-[15px] font-bold hover:text-[#ff6347] ransition-all duration-300 ease-out">
								Log in
							</span>
						</Link>
					) : (
						<UserProfile />
					)}
				</div>
			</div>
			<Dialog
				open={open}
				onClose={handelClose}
				className=""
				sx={{
					"& .MuiPaper-root": {
						borderRadius: "120px",
						overflow: "hidden",
					},
				}}
			>
				<DialogContent
					className="font-['poppins'] flex p-0 rounded-2xl w-max"
					sx={{ "&.MuiDialogContent-root": { padding: "0px" } }}
				>
					<input
						type="text"
						placeholder="Search here...."
						className="text-sm w-[250px] py-2 border-none focus:ring-0  lg:w-[400px] lg:py-4"
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
					/>
					<Button
						onClick={handelScearch}
						className="bg-red-300"
						sx={{
							"&.MuiButton-root": {
								backgroundColor: "tomato",
								color: "white",
								borderRadius: "0px",
							},
						}}
					>
						Search
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default Header;
