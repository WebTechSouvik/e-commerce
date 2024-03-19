import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";


const DataTable = ({colInfo,rowInfo}) => {



	return (
			<div className=" w-[980px] lg:w-full">
			<DataGrid
				sx={{
					"& .MuiDataGrid-columnHeaderTitleContainer": {
						justifyContent: "center",
					},

					"& .MuiDataGrid-cell--textLeft": {
						justifyContent: "center",
					},
					"& .css-yrdy0g-MuiDataGrid-columnHeaderRow": {
						backgroundColor: "tomato",
						color: "white",
					},
				}}
				rows={rowInfo}
				columns={colInfo}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 6,
						},
					},
				}}
				pageSizeOptions={[6,10]}
				autoHeight 
			/>
		</div>
	)
}

export default DataTable