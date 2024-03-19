import React, { useEffect } from "react";
import { BsMouse } from "react-icons/bs";
import axios from "axios";
import ContentWrapper from "../components/ContentWrapper.jsx";
import {useDispatch ,useSelector} from "react-redux"
import {getAllProductThunk} from "../redux/slice/productSlice.js"
import Product from "../components/Product.jsx";




const HomePage = () => {

	const {products}=useSelector((state)=>state.product)
	const dispatch=useDispatch()
	

useEffect(()=>{

dispatch(getAllProductThunk("/?limit=8"))



},[])



	return (
		<>
			<div className="h-screen max-w-screen  bg-gradient-to-r from-[#635dc0] to-[#3027ae] flex justify-center items-center flex-col gap-[24px] font-['Playfair_Display']">
				<p className="text-white text-xl lg:text-3xl ">Welecomr to Ecommerce</p>
				<h1 className="text-white text-2xl lg:text-5xl">
					FIND AMAZING PRODUCT BELOW
				</h1>
				<button className="border-2 px-5 py-1 flex items-center gap-[2px] bg-white rounded-3xl hover:bg-transparent hover:text-white transition-all duration-300 ease-out">
					<span>Scroll</span>
					<BsMouse />
				</button>
			</div>
			<div className="w-screen h-screen bg-[#f3ebeb] absolute top-0 left-0 clip-your-needful-style "></div>

			<div className="mt-20 text-center">
				<h3 className="border-b border-solid  border-black w-max m-auto px-5 text-2xl pb-2">
					Feauture Products
				</h3>
				<ContentWrapper>
					<div className="grid w-full mt-14 lg:grid-cols-4 gap-y-6 grid-cols-2 ">
						{products.length>0 &&
							products.map((product) => (
								<Product key={product._id} product={product} />
							))}
					</div>
				</ContentWrapper>
			</div>
		</>
	);
};

export default HomePage;
