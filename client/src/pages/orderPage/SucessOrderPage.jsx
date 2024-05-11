import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderThunk } from "../../redux/slice/orderSlice.js";
import { getAllItemsThunk } from "../../redux/slice/cartSlice.js";
import { GiConfirmed } from "react-icons/gi";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Metadata from "../../components/Metadata.jsx";

const SucessOrderPage = () => {
	const dispatch = useDispatch();

	const { shipingInfo, orderId, message } = useSelector(
		(state) => state.order,
	);

	const { cartItems } = useSelector((state) => state.cart);

	useEffect(() => {
		dispatch(getAllItemsThunk());
	}, []);

	useEffect(() => {
		if (cartItems.length > 0) {
			const orderItems = cartItems.map((item) => ({
				product: item.product._id,
				price: item.product.price,
			}));

			const subTotal = cartItems.reduce(
				(accu, item) => accu + item.quantity * item.product.price,
				0,
			);

			const orderInfo = {
				shipingInfo,
				orderItems,
				taxprice: Math.floor(subTotal * 0.25),
				shippingPrice: 50,
				totalPrice: Math.floor(subTotal + 50 + subTotal * 0.25),
			};
			console.log(orderInfo);
			dispatch(createOrderThunk(orderInfo));
		}
	}, [cartItems]);

	useEffect(() => {
		if (message) toast.success(message);
	}, [message]);

	return (
		<>
		<Metadata tittle="Order Sucess - Ecommerce"/>
			{orderId && (
				<div className="w-screen h-screen flex justify-center items-center">
					<div className="flex flex-col items-center gap-4">
						<div className=" text-4xl lg:text-7xl text-[#ff6347]">
							<GiConfirmed />
						</div>
						<h1 className="lg:text-2xl">
							Your Order Has Been Placed Sucessfully
						</h1>
						<Link
							to="/order/me"
							className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 w-36 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
						>
							View Order
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default SucessOrderPage;
