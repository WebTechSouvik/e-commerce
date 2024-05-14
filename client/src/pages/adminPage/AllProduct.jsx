import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAdminProductThunk,
	clearMessage,
	clearError,
} from "../../redux/slice/adminSlice.js";
import DataTable from "../../components/DataTable.jsx";
import { productColumns } from "../../constant/adminConstant.js";
import Loading from "../../components/Loading.jsx";
import Metadata from "../../components/Metadata.jsx"
import { toast } from "sonner";

function AllProduct() {
	const dispatch = useDispatch();
	const { products, message, error, loading } = useSelector(
		(state) => state.admin,
	);
	const [row, setRow] = useState([]);



	useEffect(() => {
		if (products.length > 0) {
			const tempRow = products.map((product) => {
				return {
					id: product._id,
					productId: product._id,
					productName: product.name,
					stock: product.stock,
					price: product.price,
				};
			});
			setRow(tempRow);
		}
		else{

			setRow([]);
		}
	}, [products]);

	useEffect(() => {
		if (message) {
			toast.success(message);
			dispatch(clearMessage());
		}

		if (error) {
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error, message]);

	return (
		<>
			<Metadata tittle="All Products - Admin Panel"/>
				<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-xl pb-2 mb-4 lg:hidden">
							Products
					</h1>
			{loading && <Loading />}
			<DataTable colInfo={productColumns} rowInfo={row} />
		</>
	);
}

export default AllProduct;
