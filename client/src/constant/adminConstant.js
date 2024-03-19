import { MdDeleteForever, MdEdit } from "react-icons/md";
import OrderActionButton from "../components/admin/OrderActionButton.jsx"
import ProductActionButton from "../components/admin/ProductActionButton.jsx"
import UserActionButton from "../components/admin/UserActionButton.jsx"


export const orderColumns = [
	{ field: "ordertId", headerName: "Order ID", flex: 1 },
	
	{
		field: "status",
		headerName: "Status",
		flex: 1,
		editable: true,
	},
	{
		field: "itemQty",
		headerName: "Item Qty",
		flex: 1,
		editable: true,
	},

	{
		field: "amount",
		headerName: "Amount",
		flex: 1,
		editable: true,
	},
	{
		headerName: "Action",
		renderCell: (params) => {
			return (
				<OrderActionButton id={params.id}/>
				
			);
		},
	},
];


export const productColumns = [
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
		renderCell: (params) => {
			return (
				<ProductActionButton id={params.id}/>
			);
		},
	},
];


export const userColumns = [
	{ field: "userId", headerName: "User ID", flex: 1 },
	{
		field: "name",
		headerName: "Name",
		flex: 1,
	},
	{
		field: "email",
		headerName: "Email",
		flex: 1,
		editable: true,
	},
	{
		field: "role",
		headerName: "Role",
		flex: 1,
		editable: true,
	},
	{
		headerName: "Action",
		renderCell: (params) => {
			return (
				<UserActionButton id={params.id}/>
			);
		},
	},
];