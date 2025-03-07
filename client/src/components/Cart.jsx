import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
	deleteItem,
	deleteItemsThunk,
	updateQuantity,
	clearMessage,
} from "../redux/slice/cartSlice.js";
import { toast } from "sonner";
import { PiCurrencyInrBold } from "react-icons/pi";


function Cart({ product, quantity, isCartPAge }) {
	const { cartItems, message } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const [amount, setAmount] = useState(quantity);


	const handelQun = (add,e) => {
		e.stopPropagation()
		if (1 < amount && add < 0) {
			setAmount(amount + add);
		}
		if (amount < product.stock && add > 0) {
			setAmount(amount + add);
		}
	};


	useEffect(() => {
		dispatch(updateQuantity({ productId: product._id, quantity: amount }));
	}, [amount]);




	return (
		<li className="flex pb-4 pt-8">
			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
				<img
					src={product.images[0].url}
					alt="product"
					className="h-full w-full object-contain"
				/>
			</div>

			<div className="ml-4 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between text-base font-medium text-gray-900 items-center">
						<h3>
							<Link to={`/product/${product._id}`}>
								{product.name}
							</Link>
						</h3>

						<p className="ml-4 flex gap-1 items-center"><PiCurrencyInrBold/>{product.price}</p>
					</div>
					<p className="mt-1 text-sm text-gray-500">
						{product.catagory}
					</p>
				</div>
				<div className="flex flex-1 items-center justify-between text-sm">
					{isCartPAge ? (
						<div className="flex ">
							<button
								className="px-1 bg-gray-600"
								onClick={(e) => handelQun(1,e)}
							>
								+
							</button>
							<p className="px-2  ">{amount}</p>
							<button
								className="px-1 b bg-gray-600 "
								onClick={(e) => handelQun(-1,e)}
							>
								-
							</button>
						</div>
					) : (
						<div className="flex flex-row gap-1 justify-center">
							<span className="text-[15px] font-semibold">
								Qty :
							</span>
							<span className="text-gray-500 text-[15px]">
								{quantity}
							</span>
						</div>
					)}

					{isCartPAge && <div className="flex">
						<button
							type="button"
							className="font-medium text-red-500 hover:text-red-700"
							id={product._id}
							// onClick={removeItem}
						>
							Remove
						</button>
					</div>
				}
				</div>
			</div>
		</li>
	);
}

export default Cart;
