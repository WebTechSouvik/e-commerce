import React from "react";
import { Fragment, useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { HiUsers } from "react-icons/hi";
import { VscListUnordered } from "react-icons/vsc";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { GiHamburgerMenu } from "react-icons/gi";
import logo from "../../images/logo.png";

const AdminSideBar = ({ isMobile }) => {
	return (
		<>
			<div
				className={`${
					isMobile ? "lg:hidden" : "hidden lg:flex"
				} flex flex-col gap-10  pl-4`}
			>
			<h3 className="border-b border-solid  border-black w-max mx-auto px-5 text-xl pb-1 hidden lg:block translate-x-[-14px]">
				Admin Panel
			</h3>
				<div className="flex items-center gap-2 cursor-pointer hover:bg-gray-300">
					<MdDashboard />
					<span>Dashboard</span>
				</div>
				<div className="cursor-pointer hover:bg-gray-300">
					<TreeView
						defaultCollapseIcon={<IoIosArrowDown />}
						defaultExpandIcon={<IoIosArrowUp />}
						disableSelection={true}
						disabledItemsFocusable={false}
						sx={{
							"& .MuiTreeItem-content": {
								padding: "0px",
							},
						}}
					>
						<TreeItem nodeId="1" label="Product">
							<TreeItem
								nodeId="2"
								label="All products"
								icon={<FiPlus />}
							/>
							<TreeItem
								nodeId="2"
								label="create products"
								icon={<FiPlus />}
							/>
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
