import { Fragment, useState,useEffect } from "react";
import ContentWrapper from "../components/ContentWrapper.jsx";
import Cart from "../components/Cart.jsx";
import {useSelector,useDispatch} from "react-redux"
import { FaShoppingCart } from "react-icons/fa"
import { Link } from "react-router-dom";
import {getAllItemsThunk} from "../redux/slice/cartSlice.js"

const products = [
	{
		id: 1,
		name: "Throwback Hip Bag",
		href: "#",
		color: "Salmon",
		price: "$90.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
		imageAlt:
			"Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
	},
	{
		id: 2,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
	{
		id: 2,
		name: "Medium Stuff Satchel",
		href: "#",
		color: "Blue",
		price: "$32.00",
		quantity: 1,
		imageSrc:
			"https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
		imageAlt:
			"Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
	},
];

const CartPage = () => {
	const [open, setOpen] = useState(true);
	const {isAuthinticated}=useSelector((state)=>state.user)
	const {cartItems}=useSelector((state)=>state.cart)
	const dispatch=useDispatch()
	console.log(cartItems)

useEffect(()=>{
 if(isAuthinticated)
	dispatch(getAllItemsThunk())

},[isAuthinticated])

	return (
		!isAuthinticated ?<div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
		<div className="h-1/3">
		<img src="https://www.business2community.com/wp-content/uploads/2014/09/187841511.jpg" alt="" className="h-full mix-blend-darken"/ >
		</div>
		<p>Login to see the items you added previously</p>
		<Link to="/login" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 w-36 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Login</Link>
			
		</div>


		:<ContentWrapper>
			<div className="mt-40 bg-white px-2 py-5">
				<div className="flow-root">
					<ul role="list" className="-my-6 divide-y divide-gray-300">
						{cartItems.length>0 && cartItems.map((item) => {
						
							return <Cart key={item.product._id} product={item.product} />}
						)}
					</ul>
				</div>
			</div>

			<div className="border-t border-gray-200  py-6 ">
				<div className="flex justify-end gap-5 text-base font-medium text-gray-900">
					<p>Subtotal</p>
					<p>$262.00</p>
				</div>
				<p className="mt-2 text-sm text-gray-500 flex justify-end">
					<span>Shipping and taxes calculated at checkout.</span>
				</p>
				<div className="mt-6 flex justify-end">
					<a
						href="#"
						className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 w-36 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
					>
						Checkout
					</a>
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
	)
};

export default CartPage;
