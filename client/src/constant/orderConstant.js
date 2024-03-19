import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdLocalShipping, MdLibraryAddCheck } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import {Link} from "react-router-dom"

export const columns = [
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
				<>
					<Link to={`/order/${params.id}`} className="text-xl text-red-600 flex gap-4">
						<FaArrowUpRightFromSquare />
					</Link>
				</>
			);
		},
	},
];

export const createOrderSteps = [
	{
		name: "Shipping Details",
		icon: <MdLocalShipping className="lg:text-2xl" />,
	},
	{
		name: "Confirm Order",
		icon: <MdLibraryAddCheck className="lg:text-2xl" />,
	},
	{ name: "Payment", icon: <BsBank2 className="lg:text-2xl" /> },
];


export const OrderStatusSteps = [
	{
		name: "Processing",
		
	},
	{
		name: "Shipping",
		
	},
	{ name: "Delivered", }
];
