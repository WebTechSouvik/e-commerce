import React from "react";
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Product from "../../components/Product.jsx";
import ProductFilterItem from "../../components/ProductFilterItem.jsx";
import MobileSideBar from "../../components/MobileSideBar.jsx";
import { HiMiniFunnel } from "react-icons/hi2";
import Loading from "../../components/Loading.jsx"
import {clearError} from "../../redux/slice/productSlice.js"
import { toast } from "sonner";





const ProductsPage = () => {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	const { products,loading,error } = useSelector((state) => state.product);
	const dispatch=useDispatch()

	useEffect(()=>{
		if(error){
			toast.error(error.message)
			dispatch(clearError())

		}

	},[error])

	return (
		<div className="mt-[100px]">
		{loading&& <Loading/>}
			<div>
				{/* Mobile filter dialog */}

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between pb-6">
						<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-2xl pb-2">
							Products
						</h1>

						<MobileSideBar icon={<HiMiniFunnel />}>
							{/* Filters */}
							<ProductFilterItem isMobile={true} />
						</MobileSideBar>
					</div>

					<section aria-labelledby="products-heading" className="">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
							{/* Filters */}
							<ProductFilterItem isMobile={false} />
							
							{/* Product grid */}
							<div className="lg:col-span-4 grid  grid-cols-2 lg:grid-cols-4 gap-y-6">
								{products.map((product) => (
									<Product product={product} />
								))}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default ProductsPage;
