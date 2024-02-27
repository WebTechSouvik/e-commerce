import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import UserProfile from "../UserProfile.jsx";
import "./style.css";

const Header = () => {
	return (
		<div className="flex h-16 px-5 shadow-xl fixed top-0 left-0 w-screen backdrop-blur-md z-10">
			<div className="h-full w-1/2">
				<img src={logo} alt="" className="h-full w-1/2 object-cover" />
			</div>
			<div className="flex gap-[50px] w-1/2 items-center">
				<ul className="flex gap-14 text-lg font-semibold font-['Josefin_Sans','sans-serif']">
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

				<div className="flex gap-14 text-[24px] items-center ">
					<FaSearch className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" />
					<Link to="/cart">
						<FaCartPlus className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" />
					</Link>

				</div>
			</div>
			<UserProfile />
		</div>
	);
};

export default Header;
