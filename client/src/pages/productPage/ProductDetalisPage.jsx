import React, { useState, useRef, useEffect } from "react";
import ContentWrapper from "../../components/ContentWrapper.jsx";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToCartThunk,clearMessage } from "../../redux/slice/cartSlice.js";
import {getAllProductThunk,getSingleProductThunk} from "../../redux/slice/productSlice.js"
import { toast } from 'sonner';
import Loading from "../../components/Loading.jsx"

const ProductDetalisPage = () => {
	const [change, setchange] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const { Id } = useParams();
	const shortdiv = useRef(null);
	const longdiv = useRef(null);
	const dispatch = useDispatch();
	const {cartItems,message,loading:cartLoading} = useSelector((state) => state.cart);
	const {product,loading:productLoading}=useSelector((state)=>state.product)

	

	useEffect(()=>{
		dispatch(getSingleProductThunk(`/${Id}`))

	},[])

	useEffect(()=>{
		if(message){
		toast.success(message)
		
		dispatch(clearMessage())
	}
	},[message])

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

	const handelQun = (add) => {
		if (1 < quantity && add < 0) {
			setQuantity(quantity + add);
		}
		if (quantity < product.stock && add > 0) {
			setQuantity(quantity + add);
		}
	};

	const addToACartFun = () => {
		const newItem = {
			product: {
				_id: product._id,
				name: product.name,
				price: product.price,
				images: product.images,
				stock: product.stock,
			},
			quantity,
		};
		const value={
					productId:product._id,
					quantity
				}
				
		if (cartItems.length == 0) {
			dispatch(addToCart(newItem));
			dispatch(addToCartThunk(value));
		} else {
			const ispresent = cartItems.some(
				(item) => product._id == item.product._id,
			);

			if (ispresent) {
				console.log(ispresent);
			
				//alert show "cartItems is present"
				toast.error("item alredey presnt")
				return;
			} else {
				console.log(value)
				dispatch(addToCart(newItem));


				dispatch(addToCartThunk(value));
			}
		}
	};



	return (

	!productLoading	&& product ? 
		<div className="bg-[#f3ebeb] mt-[100px]">
		{cartLoading && <Loading/>}
			<ContentWrapper>
				<div className="grid grid-cols-1 lg:grid-cols-2 w-full font-['poppins']">
					<div className=" flex justify-center cartItems-center gap-4">
						<FaAngleLeft onClick={() => carosal(314)} className="cursor-pointer text-lg hidden lg:block"/>
						<div
							ref={shortdiv}
							className="max-w-[314px] overflow-scroll lg:overflow-hidden h-[380px]"
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
								<div className="h-full min-w-[314px]">
									<img
										src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
										alt=""
										className="mix-blend-multiply h-full w-full object-contain"
									/>
								</div>
							</div>
						</div>
						<FaChevronRight onClick={() => carosal(-314)} className="cursor-pointer text-lg hidden lg:block" />
					</div>
					<div className="flex flex-col w-full  mt-10 cartItems-center lg:w-[70%] lg:block lg:pl-10">
						<h2 className="text-2xl font-bold">{product.name}</h2>
						<p className="text-gray-600 text-sm border-b-[1px] border-gray-400 pb-1">
							{product._id}
						</p>
						<div className="py-6 border-b-[1px] border-gray-400">
							<StarRatings
								starSpacing="1px"
								rating={2}
								starDimension="20px"
								starRatedColor="#ff6347"
							/>
						</div>
						<p className="text-2xl my-3">{product.price}</p>

						<div className="lg:inline mb-4">
							<button
								className="px-3 bg-gray-600 inline lg:px-2"
								onClick={() => handelQun(1)}
							>
								+
							</button>
							<p className="px-3 bg-white inline ">{quantity}</p>
							<button
								className="px-3 b bg-gray-600 inline lg:px-2 "
								onClick={() => handelQun(-1)}
							>
								-
							</button>
						</div>
						<button
							className="px-7 py-2 bg-[#ff6347] inline rounded-3xl text-white lg:px-3 lg:py-1 lg:ml-5"
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
						<p className="text-sm">{product.description}</p>
						<button className=" px-7 py-3 bg-[#ff6347] inline rounded-3xl text-white mt-5 lg:px-4 lg:py-2 lg:text-[12px]">
							Submit Review
						</button>
					</div>
				</div>
			</ContentWrapper>
		</div>:productLoading && <Loading/>
	);
};

export default ProductDetalisPage;
