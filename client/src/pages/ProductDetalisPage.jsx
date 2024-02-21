import React, { useState, useRef, useEffect } from "react";
import ContentWrapper from "../components/ContentWrapper.jsx";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet.jsx";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartThunk } from "../redux/slice/cartSlice.js";

const ProductDetalisPage = () => {
	const [change, setchange] = useState(0);
	const [product, setProduct] = useState();
	const [quantity, setQuantity] = useState(1);
	const { Id } = useParams();
	const { data, loading, error } = useGet(`/product/${Id}`);
	const shortdiv = useRef(null);
	const longdiv = useRef(null);
	const dispatch = useDispatch();
	const items = useSelector((state) => state.cart.cartItems);

	useEffect(() => {
		setProduct(data?.product);
	}, [data]);

	const carosal = (scroll) => {
		const maxScroll =
			longdiv.current.scrollWidth - shortdiv.current.offsetWidth;
		console.log(maxScroll);
		const newScroll = change + scroll;
		console.log(newScroll);
		if (-maxScroll <= newScroll && newScroll <= 0) {
			setchange(newScroll);
		}
	};

	const addToACartFun = () => {
		const newItem = {
			product: {
				_id: product?._id,
				name: product?.name,
				price: product?.price,
				images: product?.images,
				stock: product?.stock,
			},
			quantity,
		};
		if (items.length == 0) {
			dispatch(addToCart(newItem));
			dispatch(addToCartThunk(product?._id, quantity));
		} else {
			const ispresent = items.some(
				(item) => product?._id == item.product._id,
			);

			if (ispresent) {
				console.log(ispresent);
				return;
				//alert show "items is present"
			} else {
				dispatch(addToCart(newItem));
				dispatch(addToCartThunk(product._id, quantity));
			}
		}
	};

	return (
		<div className="bg-[#f3ebeb]">
			<ContentWrapper>
				<div className=" w-full relative top-40 flex font-['poppins']">
					<div className=" w-1/2 flex justify-center items-center gap-4">
						<FaAngleLeft onClick={() => carosal(314)} />
						<div
							ref={shortdiv}
							className="max-w-[314px] overflow-hidden h-[380px]"
						>
							<div
								ref={longdiv}
								className="flex  h-full"
								style={{ transform: `translateX(${change}px)` }}
							>
								<div className="h-full min-w-[314px]">
									<img
										src="https://m.media-amazon.com/images/I/41JVgTrS9RL._AC_UL320_.jpg"
										alt=""
										className="mix-blend-multiply h-full w-full object-contain"
									/>
								</div>
							</div>
						</div>
						<FaChevronRight onClick={() => carosal(-314)} />
					</div>
					<div className=" w-[30%] pl-10">
						<h2 className="text-2xl font-bold">{product?.name}</h2>
						<p className="text-gray-600 text-sm border-b-[1px] border-gray-400 pb-1 ">
							{product?._id}
						</p>
						<div className="py-6 border-b-[1px] border-gray-400">
							<StarRatings
								starSpacing="1px"
								rating={2}
								starDimension="20px"
								starRatedColor="#ff6347"
							/>
						</div>
						<p className="text-2xl my-3">{product?.price}</p>

						<div className="inline">
							<button className="px-1 bg-gray-600 inline">
								+
							</button>
							<p className="px-2 bg-white inline ">1</p>
							<button className="px-1 b bg-gray-600 inline ">
								-
							</button>
						</div>
						<button
							className=" ml-3 px-2 py-1 bg-[#ff6347] inline rounded-2xl text-white"
							onClick={addToACartFun}
						>
							Add To Cart
						</button>

						<p className="mt-4 border-t-[1px] border-gray-400 text-gray-600 text-sm pt-2">
							staus-Instock
						</p>
						<h1 className="font-bold mt-4 border-t-[1px] border-gray-400 pt-2">
							Description
						</h1>
						<p className="text-sm">{product?.description}</p>
						<button className="px-4 py-2 bg-[#ff6347] inline rounded-2xl text-white mt-5 text-[12px]">
							Submit Review
						</button>
					</div>
				</div>
			</ContentWrapper>
		</div>
	);
};

export default ProductDetalisPage;
