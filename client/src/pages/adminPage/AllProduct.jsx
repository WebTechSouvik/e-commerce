import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProductThunk } from "../../redux/slice/adminSlice.js";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const columns = [
	{ field: "productId", headerName: "Product ID", flex: 1 },
	{
		field: "productName",
		headerName: "Product Name",
		flex: 1,
	},
	{
		field: "stock",
		headerName: "Stock",
		flex: 1,
		editable: true,
	},
	{
		field: "price",
		headerName: "Price",
		flex: 1,
		editable: true,
	},
	{
		headerName: "Action",
		renderCell: () => {
			return (
				<>
					<div className="text-xl text-red-600 flex gap-4">
						<MdEdit />
						<MdDeleteForever />
					</div>
				</>
			);
		},
	},
];

function AllProduct() {
	const dispatch = useDispatch();
	const { products } = useSelector((state) => state.admin);

	useEffect(() => {
		dispatch(getAdminProductThunk());
	}, []);

	const row = products.map((product) => {
		return {
			id: product._id,
			productId: product._id,
			productName: product.name,
			stock: product.stock,
			price: product.price,
		};
	});

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
				rows={row}
				columns={columns}
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
	);
}

export default AllProduct;
