import React, { useState, useEffect } from "react";
import OrderStep from "../../components/OrderStep.jsx";
import {createOrderSteps} from "../../constant/orderConstant.js"
import ContentWrapper from "../../components/ContentWrapper.jsx";
import Cart from "../../components/Cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addStripeClientKey } from "../../redux/slice/orderSlice.js";
import axios from "axios";
import { toast } from "sonner";
import Loading from "../../components/Loading.jsx"
import Metadata from "../../components/Metadata.jsx"

const ConfirmOrderPage = () => {
	const { cartItems } = useSelector((state) => state.cart);
	const [loading,setLoading]=useState(false)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [subTotal, setSubTotal] = useState();
	const [gst, setGst] = useState();
	const [total, setTotal] = useState();

	useEffect(() => {
		const totalAmount = cartItems.reduce(
			(accu, item) => accu + item.quantity * item.product.price,
			0,
		);

		setSubTotal(totalAmount);
		setGst(Math.floor(totalAmount * 0.25));
		setTotal(Math.floor(totalAmount + 50 + totalAmount * 0.25));
	}, [cartItems]);

	const handelPayment = async () => {
		const configs = {
			headers: {
				"Content-Type": "application/json",
			},
			withCredentials: true,
		};
		try {
			setLoading(true)
			const { data } = await axios.post(
				"http://localhost:8000/api/v1/payment/create-checkout-session",
				{ orderItems: cartItems },
				configs,
			);
			setLoading(false)
			localStorage.setItem("stripeClientkey",data.clientSecret)
			dispatch(addStripeClientKey(data.clientSecret));
			navigate("/payment");
		} catch (err) {
			toast.error(err.response.data.message)
		}
	};

	return (
		<>
			<Metadata tittle="Confirm Order - Ecommerce"/>
		<div className="mt-[100px]">
		{loading&&<Loading/>}
			<OrderStep active={1} steps={createOrderSteps}/>
			<ContentWrapper>
				<div className="grid grid-col-1 lg:grid-cols-3 mt-16">
					<div className="lg:col-span-2 lg:px-6">
						<h2 className="font-semibold leading-7 text-gray-900 text-center text-2xl lg:mt-[21px]">
							<span className=" border-b border-gray-900 py-2">
								{" "}
								Cart Items
							</span>
						</h2>

						<div className="mt-8 bg-white lg:bg-transparent px-2 py-5">
							<div className="flow-root">
								<ul
									role="list"
									className="-my-6 divide-y divide-gray-300"
								>
									{cartItems.length > 0 &&
										cartItems.map((item) => {
											return (
												<Cart
													key={item.product._id}
													product={item.product}
													quantity={item.quantity}
													isCartPAge={false}
												/>
											);
										})}
								</ul>
							</div>
						</div>
					</div>
					<div className="">
						<div className="border-t border-gray-200  py-6 lg:bg-white px-6">
							<h2 className="font-semibold leading-7 text-gray-900 text-center text-2xl">
								Order Summry
							</h2>
							<div className="flex flex-col gap-5 py-6 border-y-2 border-gray-300 mt-6">
								<div className="flex justify-between gap-5 text-base font-medium text-gray-900">
									<p>Subtotal</p>
									<p>${subTotal}</p>
								</div>
								<div className="flex justify-between gap-5 text-base font-medium text-gray-900">
									<p>Shipping Charge</p>
									<p>$50</p>
								</div>
								<div className="flex justify-between gap-5 text-base font-medium text-gray-900">
									<p>GST</p>
									<p>${gst}</p>
								</div>
							</div>
							<div className="flex justify-between gap-5 text-base font-medium text-gray-900 mt-5">
								<p>Total</p>
								<p>${total}</p>
							</div>

							<div className="mt-6 flex justify-end">
								<a
									href="#"
									className="flex items-center w-full justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 w-36 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
									onClick={handelPayment}
								>
									Procced To Payment
								</a>
							</div>
						</div>
					</div>
				</div>
			</ContentWrapper>
		</div>
		</>
	);
};

export default ConfirmOrderPage;
