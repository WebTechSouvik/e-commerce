import React from 'react'
import MobileSideBar from "../MobileSideBar.jsx"
import AdminSideBarItems from "./AdminSideBarItems.jsx"
import { GiHamburgerMenu } from "react-icons/gi";

const AdminSideBar = () => {
	return (
		<>
			<MobileSideBar icon={<GiHamburgerMenu/>} >
			<AdminSideBarItems isMobile={true}/>
			</MobileSideBar>
			<AdminSideBarItems isMobile={false}/>

		</>
	)
}

export default AdminSideBar