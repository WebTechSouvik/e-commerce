import React, { useState, useRef, useEffect } from "react";
import ContentWrapper from "../../components/ContentWrapper.jsx";
import Review from "../../components/Review.jsx";
import StarRatings from "react-star-ratings";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCart,
	addToCartThunk,
	clearMessage,
	clearError,
} from "../../redux/slice/cartSlice.js";
import {
	getAllProductThunk,
	getSingleProductThunk,
	addReviewThunk,
	addNewReview,
	clearMessage as productClearMessage,
	clearError as productClearError,
} from "../../redux/slice/productSlice.js";
import { toast } from "sonner";
import Loading from "../../components/Loading.jsx";
import Dots from "react-carousel-dots";
import Metadata from "../../components/Metadata.jsx"

const ProductDetalisPage = () => {
	const [change, setchange] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [activeCarousal, setActiveCarousal] = useState(0);
	const [open, setOpen] = React.useState(false);
	const [ratingValue, setRatingValue] = useState(0);
	const [textValue, setTextValue] = useState(0);
	const { Id } = useParams();
	const shortdiv = useRef(null);
	const longdiv = useRef(null);
	const dispatch = useDispatch();
	const {
		cartItems,
		message: cartMessage,
		loading: cartLoading,
		error: cartError,
	} = useSelector((state) => state.cart);
	const {
		product,
		message: productMessage,
		loading: productLoading,
		error: productError,
	} = useSelector((state) => state.product);

	const {user}=useSelector((state)=>state.user)

	useEffect(() => {
		dispatch(getSingleProductThunk(`/${Id}`));
	}, []);

	const carosal = (scroll) => {
		const maxScroll =
			longdiv.current.scrollWidth - shortdiv.current.offsetWidth;
		console.log(maxScroll);
		const newScroll = change + scroll;
		console.log(newScroll);
		if (-maxScroll <= newScroll && newScroll <= 0) {
			setActiveCarousal((prev) => prev + (scroll / 314) * -1);
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
		const value = {
			productId: product._id,
			quantity,
		};

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
				toast.error("item alredey presnt");
				return;
			} else {
				console.log(value);
				dispatch(addToCart(newItem));

				dispatch(addToCartThunk(value));
			}
		}
	};

	const handelClose = () => {
		setOpen(false);
		setTextValue(null);
		setRatingValue(null);
	};

	const handelReviewSubmit = () => {
		console.log(ratingValue, textValue);
		const reviewInfo = {
			rating: ratingValue,
			description: textValue,
		};
		const newReview={
			...reviewInfo,
			owner:{
				avtar:{
					url:user?.avtar?.url
				},
				id:user?._id
			}
		}
		
		dispatch(addReviewThunk({ id: Id, reviewInfo }));
		dispatch(addNewReview(newReview))

		setOpen(false);
	};

	useEffect(() => {
		if (cartMessage) {
			toast.success(cartMessage);

			dispatch(clearMessage());
		}
		if (cartError) {
			toast.error(cartError.message);
			dispatch(clearError());
		}
	}, [cartMessage, cartError]);

	useEffect(() => {
		if (productMessage) {
			toast.success(productMessage);

			dispatch(productClearMessage());
		}
		if (productError) {
			toast.error(productError.message);
			dispatch(productClearError());
		}
	}, [productMessage, productError]);

	return productLoading ? (
		<Loading />
	) : (
		product && (
			<div className="bg-[#f3ebeb] mt-[100px]">
			<Metadata tittle={`${product.name} - Ecommerce`}/>
				{cartLoading && <Loading />}
				<ContentWrapper>
					<div className="grid grid-cols-1 lg:grid-cols-2 w-full font-['poppins']">
						<div className=" flex relative justify-center items-center cartItems-center gap-4">
							<FaAngleLeft
								onClick={() => carosal(314)}
								className="cursor-pointer text-lg hidden lg:block"
							/>
							<div
								ref={shortdiv}
								className="max-w-[314px] overflow-scroll lg:overflow-hidden h-[380px]"
							>
								<div
									ref={longdiv}
									className="flex  h-full"
									style={{
										transform: `translateX(${change}px)`,
									}}
								>
									{product.images.map((image) => (
										<div className="h-full min-w-[314px]">
											<img
												src={image.url}
												alt=""
												className="mix-blend-multiply h-full w-full object-contain"
											/>
										</div>
									))}
								</div>
							</div>
							<FaChevronRight
								onClick={() => carosal(-314)}
								className="cursor-pointer text-lg hidden lg:block"
							/>
							<Dots
								length={product.images.length}
								active={activeCarousal}
								visible={4}
								size={8}
								className="absolute bottom-0"
							/>
						</div>
						<div className="flex flex-col w-full  mt-10 cartItems-center lg:w-[70%] lg:block lg:pl-10">
							<h2 className="text-2xl font-bold">
								{product.name}
							</h2>
							<p className="text-gray-600 text-sm border-b-[1px] border-gray-400 pb-1">
								{product._id}
							</p>
							<div className="flex items-center gap-1 py-6 border-b-[1px] border-gray-400">
								<StarRatings
									starSpacing="1px"
									rating={product.avgRating}
									starDimension="20px"
									starRatedColor="#ff6347"
								/>
								<span className="text-sm relative top-[2px] text-gray-600">({product.reviwes.length})</span>
							</div>
							<p className="text-2xl my-3">{product.price}</p>

							<div className="lg:inline mb-4">
								<button
									className="px-3 bg-gray-600 inline lg:px-2"
									onClick={() => handelQun(1)}
								>
									+
								</button>
								<p className="px-3 bg-white inline ">
									{quantity}
								</p>
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

							<p className="mt-4 border-t-[1px] border-gray-400 font-bold text-sm pt-2">
								status- <span className={`${product.stock!=0?"text-[#009933] font-semibold":"text-red-500"}`}>{product.stock!=0? "In stock": "Out of Stock"}</span>
							</p>
							<h1 className="font-bold mt-4 border-t-[1px] border-gray-400 pt-2">
								Description
							</h1>
							<p className="text-sm">{product.description}</p>
							<button
								className=" px-7 py-3 bg-[#ff6347] inline rounded-3xl text-white mt-5 lg:px-4 lg:py-2 lg:text-[12px]"
								onClick={() => setOpen(true)}
							>
								Submit Review
							</button>
						</div>
						<Dialog open={open} onClose={handelClose}>
							<DialogTitle className="text-center mb-4">
								Submit Review
							</DialogTitle>
							<DialogContent className="font-['poppins'] flex flex-col gap-5">
								<Rating
									name="simple-controlled"
									value={ratingValue}
									onChange={(event, newValue) => {
										setRatingValue(newValue);
									}}
								/>
								<textarea
									className="text-sm  w-[250px] h-[100px] focus:ring-1 focus:border-none focus:ring-inset focus:ring-[#ff6347] lg:w-[400px]"
									value={textValue}
									onChange={(e) =>
										setTextValue(e.target.value)
									}
								></textarea>
							</DialogContent>
							<DialogActions>
								<Button onClick={() => setOpen(false)}>
									Cancel
								</Button>
								<Button onClick={handelReviewSubmit}>
									Submit
								</Button>
							</DialogActions>
						</Dialog>
					</div>
					<div className="mt-10 lg:px-7">
						<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-2xl pb-2">
							Review
						</h1>
						<div className="mt-6 flex flex-col gap-5 divide-y divide-gray-300 ">
							{product.reviwes &&
								product.reviwes.map((review) => (
									<Review review={review} />
								))}
						</div>
					</div>
				</ContentWrapper>
			</div>
		)
	);
};

export default ProductDetalisPage;
