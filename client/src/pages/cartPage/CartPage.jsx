import { Fragment, useState, useEffect } from "react";
import ContentWrapper from "../../components/ContentWrapper.jsx";
import Cart from "../../components/Cart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
	getAllItemsThunk,
	deleteItem,
	deleteItemsThunk,
	clearMessage,
} from "../../redux/slice/cartSlice.js";
import { toast } from "sonner";

const CartPage = () => {
	const { isAuthinticated } = useSelector((state) => state.user);
	const { cartItems, message } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [total, setTotal] = useState();
	const [productId, setProductId] = useState();

	const removeItem = (id) => {
		dispatch(deleteItemsThunk(id));
		setProductId(id);
	};

	useEffect(() => {
		if (isAuthinticated) dispatch(getAllItemsThunk());
	}, [isAuthinticated]);

	useEffect(() => {
		const totalAmount = cartItems.reduce(
			(accu, item) => accu + item.quantity * item.product.price,
			0,
		);

		setTotal(totalAmount);
	}, [cartItems]);

	useEffect(() => {
	
		if (message) {
			toast.success(message);
			dispatch(deleteItem(productId));
			dispatch(clearMessage());
		}
	}, [message, productId]);

	return !isAuthinticated ? (
		<div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
			<div className="h-1/3">
				<img
					src="https://www.business2community.com/wp-content/uploads/2014/09/187841511.jpg"
					alt=""
					className="h-full mix-blend-darken"
				/>
			</div>
			<p>Login to see the items you added previously</p>
			<Link
				to="/login"
				className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 w-36 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
			>
				Login
			</Link>
		</div>
	) : (
		<ContentWrapper>
			<div className="mt-40 bg-white px-2 py-5">
				<div className="flow-root">
					<ul
						role="list"
						className="-my-6 divide-y divide-gray-300"
						onClick={(e) => removeItem(e.target.id)}
					>
						{cartItems.length > 0 &&
							cartItems.map((item) => {
								return (
									<Cart
										key={item.product._id}
										product={item.product}
										quantity={item.quantity}
										isCartPAge={true}
									/>
								);
							})}
					</ul>
				</div>
			</div>

			<div className="border-t border-gray-200  py-6 ">
				<div className="flex justify-end gap-5 text-base font-medium text-gray-900">
					<p>Subtotal</p>
					<p>${total}</p>
				</div>
				<p className="mt-2 text-sm text-gray-500 flex justify-end">
					<span>Shipping and taxes calculated at checkout.</span>
				</p>
				<div className="mt-6 flex justify-end">
					<Link
						href="#"
						className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 w-36 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
						to="/shipping"
					>
						Checkout
					</Link>
				</div>
				<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
					<p>
						or{" "}
						<button
							type="button"
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Continue Shopping
							<span aria-hidden="true"> &rarr;</span>
						</button>
					</p>
				</div>
			</div>
		</ContentWrapper>
	);
};

export default CartPage;
