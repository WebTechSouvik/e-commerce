import React from "react";
import logo from "../../images/logo.png";
import Profile from "../../images/Profile.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaHome } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md"
import { IoIosContact } from "react-icons/io"
import { FaPhoneVolume } from "react-icons/fa6";
import { SlLogin } from "react-icons/sl";
import { GiHamburgerMenu } from "react-icons/gi";
import UserProfile from "../UserProfile.jsx";
import MobileSideBar from "../MobileSideBar.jsx"
import {useSelector} from "react-redux"
import "./style.css";

const Header = () => {
	const {isAuthinticated,message,error}=useSelector((state)=>state.user)


	


	return (
		<div className="relative">
		<div className="flex h-16  shadow-xl fixed top-0 left-0 w-screen backdrop-blur-md z-10 justify-between ">
			<MobileSideBar icon={<GiHamburgerMenu/>}>
			<div className="w-2/3 -translate-y-7 -translate-x-3">
				<img src={logo} alt="" className="w-full object-contain" />
			</div>
			<ul className="flex flex-col gap-14 text-lg pl-5 font-semibold -translate-y-8  font-['Josefin_Sans','sans-serif']">
					<li className="hover:text-[#ff6347]  transition-all duration-300 ease-out flex gap-2">
					<FaHome className="translate-y-[2px]"/>
						<Link to="/">Home</Link>
					</li>
					<li className="hover:text-[#ff6347] transition-all duration-300 ease-out flex gap-2">
						<MdOutlineProductionQuantityLimits className="translate-y-[2px]"/>
						<Link to="/Products">Product</Link>
					</li>
					<li className="hover:text-[#ff6347] transition-all duration-300 ease-out flex gap-2">
						<FaPhoneVolume className="translate-y-[2px]"/>
						<Link>Contact</Link>
					</li>
					<li className="hover:text-[#ff6347] transition-all duration-300 ease-out flex gap-1">
						<IoIosContact className="translate-y-[1px] text-[22px]"/>
						<Link>About</Link>
					</li>
					
				</ul>
				<div className="flex absolute bottom-3 gap-2 w-full justify-center">
					<div className="flex gap-2 items-center"><CgProfile/><Link to="/register" className="text-[#ff6347]">Create a account</Link></div>
					<span>or</span>
					<div className="flex gap-2 items-center"><SlLogin/><Link to="/login" className="text-[#ff6347]">Sing in</Link></div>
				</div>
			</MobileSideBar>
			<div className="h-full w-1/2">
				<img src={logo} alt="" className="h-full w-full object-cover lg:w-1/2" />
			</div>
			<div className="flex w-1/2 items-center justify-end lg:gap-[65px] lg:justify-start">
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

				<div className="flex gap-6 items-center text-[20px] lg:text-[24px] lg:gap-8">
					{/*<Link><FaSearch className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" /></Link>*/}
					<Link to="/cart">
						<FaCartPlus className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" />

					</Link>
					{!isAuthinticated && <Link to="/login" className="flex gap-2"> <CgProfile className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out"/><span className="text-[15px] font-bold hover:text-[#ff6347] ransition-all duration-300 ease-out">Log in</span></Link> }
				</div>
			</div>
		
			{isAuthinticated && <UserProfile />}
		</div>
		</div>

	);
};

export default Header;
