import React from 'react'
import MobileSideBar from "../MobileSideBar.jsx"
import AdminSideBarItems from "./AdminSideBarItems.jsx"

const AdminSideBar = () => {
	return (
		<>
			<MobileSideBar>
			<AdminSideBarItems isMobile={true}/>
			</MobileSideBar>
			<AdminSideBarItems isMobile={false}/>

		</>
	)
}

export default AdminSideBar