import React from "react";
import { Fragment, useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { FaRegListAlt } from "react-icons/fa";
import { VscListUnordered } from "react-icons/vsc";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom"

const AdminSideBar = ({ isMobile }) => {
	return (
		<>
			<div
				className={`${
					isMobile ? "lg:hidden" : "hidden lg:flex fixed w-1/4 border-r-2 border-gray-300 h-full top-[70px]"
				} flex flex-col gap-10  pl-4`}
			>
			<h3 className="border-b border-solid  border-black w-max mx-auto px-5 text-xl pb-1 hidden lg:block translate-x-[-14px] mt-10">
				Admin Panel
			</h3>
				<Link to="/admin/dashboard" className="flex items-center gap-2 cursor-pointer ">
					<MdDashboard />
					<span>Dashboard</span>
				</Link>
				<div className="cursor-pointer">
					<TreeView
						defaultCollapseIcon={<IoIosArrowDown />}
						defaultExpandIcon={<IoIosArrowUp />}
						disableSelection={true}
						disabledItemsFocusable={false}
						sx={{
							".MuiTreeItem-content": {
								padding: "0px",
							},
							
						}}
					>
						<TreeItem nodeId="1" label="Product" sx={{".Mui-focused":{
								backgroundColor:"#d6d2d2"
							},
							
}}>
						<Link to="/admin/products">
							<TreeItem
								nodeId="2"
								label="All products"
								icon={<FaRegListAlt />}
								sx={{marginTop:"10px",
								".Mui-focused":{
								backgroundColor:"#d6d2d2"
							},
						
							}}
							/>
							</Link>
							<Link to="/admin/product">
							<TreeItem
								nodeId="3"
								label="create product"
								icon={<FiPlus />}
								sx={{marginTop:"10px",
								".Mui-focused":{
								backgroundColor:"#d6d2d2"
							}

							}}
							/>
								</Link>
						</TreeItem>
					</TreeView>
				</div>
				<div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300">
					<HiUsers />
					<span>User</span>
				</div>
				<div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300">
					<VscListUnordered />
					<span>Orders</span>
				</div>
			</div>
		</>
	);
};

export default AdminSideBar;
