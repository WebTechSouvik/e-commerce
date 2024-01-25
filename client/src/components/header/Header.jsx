import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

import "./style.css";

const Header = () => {
	return (
		<div className="flex h-16 px-5 shadow-xl absolute top-0 left-0 w-screen bg-[#ffffff1a]">
			<div className="h-full w-1/2">
				<img src={logo} alt="" className="h-full w-1/2 object-cover" />
			</div>
			<div className="flex justify-between w-1/2 items-center">
		
				<ul className="flex gap-14 text-lg font-semibold font-['Josefin_Sans','sans-serif']">
					<li className="hover:text-[#ff6347]  transition-all duration-300 ease-out">
						<Link>Home</Link>
					</li>
					<li  className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link>Product</Link>
					</li>
					<li  className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link>Contact</Link>
					</li>
					<li  className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link>About</Link>
					</li>
					<li  className="hover:text-[#ff6347] transition-all duration-300 ease-out">
						<Link></Link>
					</li>
					
				</ul>
		
			<div className="flex gap-5 text-xl ">
				<FaSearch className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out" />
				<FaCartPlus className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out"/>
				<CgProfile className="cursor-pointer hover:text-[#ff6347] hover:scale-125 transition-all duration-300 ease-out"/>
			</div>
			</div>
		</div>
	);
};

export default Header;
