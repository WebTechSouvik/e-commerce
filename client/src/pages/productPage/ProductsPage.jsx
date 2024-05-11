import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Product from "../../components/Product.jsx";
import ProductFilterItem from "../../components/ProductFilterItem.jsx";
import MobileSideBar from "../../components/MobileSideBar.jsx";
import { HiMiniFunnel } from "react-icons/hi2";
import Loading from "../../components/Loading.jsx";
import {getAllProductThunk, setPage,resetPage,clearError } from "../../redux/slice/productSlice.js";
import { toast } from "sonner";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Metadata from "../../components/Metadata.jsx"

const ProductsPage = () => {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [link, setLink] = useState("");
	const { products,filter,price, totalProductsCount,currentPage, loading, error } = useSelector(
		(state) => state.product,
	);
	const { keyword } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetPage())
	}, [keyword,filter]);


	useEffect(() => {
		let newlink = "";
		if (filter) {
			newlink = `?catagory=${filter}&price[gte]=${
				price[0]
			}&price[lte]=${price[1]}&page=${currentPage}&limit=${8}`;
		} else {
			newlink = `?price[gte]=${price[0]}&price[lte]=${
				price[1]
			}&page=${currentPage}&limit=${8}`;
		}
	
		if (keyword) {
			newlink += `&query=${keyword}`;
			setLink(newlink);
		}
		if(!keyword){
			setLink(newlink);
		}
		
	}, [filter,keyword,price,currentPage]);

	useEffect(() => {
		if (link) dispatch(getAllProductThunk(link));
	}, [link]);

	useEffect(() => {
		if (error) {
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error]);

	return (
		<div className="mt-[100px] min-h-[55vh]">
		<Metadata tittle="Products - Ecommerce"/>
			{loading && <Loading />}
			<div>
				{/* Mobile filter dialog */}

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline items-center  justify-between pl-4 pb-6">
					<MobileSideBar icon={<HiMiniFunnel />}>
							{/* Filters */}
							<ProductFilterItem
								isMobile={true}
								keyword={keyword}
							
							/>
						</MobileSideBar>
						<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-2xl pb-2">
							Products
						</h1>

						
					</div>

					<section aria-labelledby="products-heading" className="">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
							{/* Filters */}
							<ProductFilterItem
								isMobile={false}
								keyword={keyword}
								
							/>

							{/* Product grid */}
							<div className="lg:col-span-4 grid  grid-cols-2 md:grid-cols-4 gap-y-6">
								{products.map((product) => (
									<Product product={product} />
								))}
							</div>
						</div>
						<div className="flex justify-center lg:block lg:relative lg:w-max left-1/2 mt-10">
							<Stack spacing={2}>
								<Pagination
									count={
										totalProductsCount % 8 == 0
											? Math.floor(totalProductsCount / 8)
											: Math.floor(
													totalProductsCount / 8,
											  ) + 1
									}
									variant="outlined"
									shape="rounded"
									page={currentPage}
									onChange={(e, val) => dispatch(setPage(val))}
									sx={{
										"& .css-19xm0h7-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
											{
												backgroundColor: "tomato",
											},
									}}
								/>
							</Stack>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
};

export default ProductsPage;
