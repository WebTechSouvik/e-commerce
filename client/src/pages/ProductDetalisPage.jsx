import React, { useState, useRef } from "react";
import ContentWrapper from "../components/ContentWrapper.jsx";
import StarRatings from "react-star-ratings";
import { useParams } from "react-router-dom";
import useGet from "../hooks/useGet.jsx";
import { FaAngleLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";
import classNames from "classnames";

const ProductDetalisPage = () => {
	const [change, setchange] = useState(0);
	const { Id } = useParams();
	const { data, loading, error } = useGet(`/product/${Id}`);
	console.log(data);
	const shortdiv = useRef(null);
	const longdiv = useRef(null);

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
								<div className="h-full min-w-[314px]">
									<img
										src="https://rukminim2.flixcart.com/image/720/1080/xif0q/shirt/m/o/t/l-st1-vebnor-original-imagmsyxhvkrfjgz.jpeg?q=70&crop=false"
										alt=""
										className="mix-blend-multiply h-full max-w-full object-cover"
									/>
								</div>
								<div className="h-full min-w-[314px]">
									<img
										src="https://rukminim2.flixcart.com/image/720/1080/xif0q/shirt/p/1/q/m-upper1-s-k-casual-original-imagu7psug4fgtjy.jpeg?q=70&crop=false"
										alt=""
										className="mix-blend-multiply h-full w-full object-contain"
									/>
								</div>
								<div className="h-full min-w-[314px]">
									<img
										src="https://rukminim2.flixcart.com/image/720/1080/xif0q/shirt/3/i/c/l-upper1-s-k-casual-original-imagu7ps2c2rzqx4.jpeg?q=70&crop=false"
										alt=""
										className="mix-blend-multiply h-full w-full object-contain"
									/>
								</div>
								<div className="h-full min-w-[314px]">
									<img
										src="https://rukminim2.flixcart.com/image/720/1080/xif0q/shirt/h/j/8/l-upper1-s-k-casual-original-imagu7psac2tdj5z.jpeg?q=70&crop=false"
										alt=""
										className="mix-blend-multiply h-full w-full object-contain"
									/>
								</div>
								<div className="h-full min-w-[314px]">
									<img
										src="https://rukminim2.flixcart.com/image/720/1080/xif0q/shirt/4/v/u/xxl-upper1-s-k-casual-original-imagu7pskdnhtu3b.jpeg?q=70&crop=false"
										alt=""
										className="mix-blend-multiply h-full w-full object-contain"
									/>
								</div>
								<div className="h-full min-w-[314px]">
									<img
										src="https://rukminim2.flixcart.com/image/720/1080/xif0q/shirt/n/b/b/s-upper1-s-k-casual-original-imagu7pstfwghmr8.jpeg?q=70&crop=false"
										alt=""
										className="mix-blend-multiply h-full w-full object-contain"
									/>
								</div>
							</div>
						</div>
						<FaChevronRight onClick={() => carosal(-314)} />
					</div>
					<div className=" w-[30%] pl-10">
						<h2 className="text-2xl font-bold">product name</h2>
						<p className="text-gray-600 text-sm border-b-[1px] border-gray-400 pb-1 ">
							product-#Id
						</p>
						<div className="py-6 border-b-[1px] border-gray-400">
							<StarRatings
								starSpacing="1px"
								rating={2}
								starDimension="20px"
								starRatedColor="#ff6347"
							/>
						</div>
						<p className="text-2xl my-3">10000</p>

						<div className="inline">
							<button className="px-1 bg-gray-600 inline">
								+
							</button>
							<p className="px-2 bg-white inline ">1</p>
							<button className="px-1 b bg-gray-600 inline ">
								-
							</button>
						</div>
						<button className=" ml-3 px-2 py-1 bg-[#ff6347] inline rounded-2xl text-white">
							Add To Cart
						</button>

						<p className="mt-4 border-t-[1px] border-gray-400 text-gray-600 text-sm pt-2">
							staus-Instock
						</p>
						<h1 className="font-bold mt-4 border-t-[1px] border-gray-400 pt-2">
							Description
						</h1>
						<p className="text-sm">this is simple product</p>
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
