import React from "react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Slider } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from "react-redux";
import Product from "../../components/Product.jsx";
import { getAllProductThunk,updateFilter } from "../../redux/slice/productSlice.js";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}



const ProductsPage = () => {
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [priceValue, setPriceValue] = useState([0, 100000]);
	const [filter, setFilter] = useState({ catagory: null, price: [0, 100000] });
	const [link, setLink] = useState("");
	const { products,filterItem } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	const handelFilter = (key,value,label,e) => {
		if (key == "catagory") {
			if (e.target.checked) {
				if (!filter.catagory) {
					setFilter({ ...filter, catagory: value });
				} else {
					setFilter((prev) => {
						return {
							...prev,
							catagory: prev.catagory + `,${value}`,
						};
					});
				}
			} else {
				const filterArray = filter?.catagory?.split(",");

				const newfilterArray = filterArray?.filter(
					(item) => item != value,
				);
				if (newfilterArray?.length == 0) {
					setFilter({ ...filter, catagory: null });
				} else {
					setFilter({ ...filter, catagory: newfilterArray?.join() });
				}
			}
		}
		dispatch(updateFilter({id:key,label}))
		
	};



const handelPrice=(value)=>{


setFilter({ ...filter, price: [...value] });


}
	useEffect(() => {
		dispatch(getAllProductThunk(link));
	}, [link]);

	useEffect(() => {
		let newlink = "";
		if (filter.catagory) {
			newlink = `?catagory=${filter.catagory}&price[gte]=${filter.price[0]}&price[lte]=${filter.price[1]}`;
		} else {
			newlink = `?price[gte]=${filter.price[0]}&price[lte]=${filter.price[1]}`;
		}

		setLink(newlink);
	}, [filter]);

	return (
		<div className="bg-white">
			<div>
				{/* Mobile filter dialog */}
				<Transition.Root show={mobileFiltersOpen} as={Fragment}>
					<Dialog
						as="div"
						className="relative z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<Transition.Child
							as={Fragment}
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</Transition.Child>

						<div className="fixed inset-0 z-40 flex">
							<Transition.Child
								as={Fragment}
								enter="transition ease-in-out duration-300 transform"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
									<div className="flex items-center justify-between px-4">
										<h2 className="text-lg font-medium text-gray-900">
											Filters
										</h2>
										<button
											type="button"
											className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
											onClick={() =>
												setMobileFiltersOpen(false)
											}
										>
											<span className="sr-only">
												Close menu
											</span>
											<XMarkIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</div>

									{/* Filters */}
									<form className="mt-4 border-t border-gray-200">
										{filterItem.map((section) => (
											<Disclosure
												as="div"
												key={section.id}
												className="border-t border-gray-200 px-4 py-6"
											>
												{({ open }) => (
													<>
														<h3 className="-mx-2 -my-3 flow-root">
															<Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
																<span className="font-medium text-gray-900">
																	{
																		section.name
																	}
																</span>
																<span className="ml-6 flex items-center">
																	{open ? (
																		<MinusIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	) : (
																		<PlusIcon
																			className="h-5 w-5"
																			aria-hidden="true"
																		/>
																	)}
																</span>
															</Disclosure.Button>
														</h3>
														<Disclosure.Panel className="pt-6">
															<div className="space-y-6">
																{section.options.map(
																	(
																		option,
																		optionIdx,
																	) => (
																		<div
																			key={
																				option.value
																			}
																			className="flex items-center"
																		>
																			<input
																				id={`filter-mobile-${section.id}-${optionIdx}`}
																				name={`${section.id}[]`}
																				defaultValue={
																					option.value
																				}
																				type="checkbox"
																				defaultChecked={
																					option.checked
																				}
																				className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																			/>
																			<label
																				htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																				className="ml-3 min-w-0 flex-1 text-gray-500"
																			>
																				{
																					option.label
																				}
																			</label>
																		</div>
																	),
																)}
															</div>
														</Disclosure.Panel>
													</>
												)}
											</Disclosure>
										))}
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</Dialog>
				</Transition.Root>

				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between pb-6 pt-24">
						<h1 className="border-b border-solid  border-black w-max m-auto px-5 text-2xl pb-2">
							Products
						</h1>

						<div className="flex items-center">
							<button
								type="button"
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>

					<section
						aria-labelledby="products-heading"
						className="pb-24 pt-10"
					>
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
							{/* Filters */}
							<form className="hidden lg:block">
								<span className="  text-2xl pb-2">Filters</span>
								{filterItem.map((section) => (
									<Disclosure
										as="div"
										key={section.id}
										className="border-b border-gray-400 py-6"
									>
										{({ open }) => (
											<>
												<h3 className="-my-3 flow-root">
													<Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
														<span className="font-medium text-gray-900">
															{section.name}
														</span>
														<span className="ml-6 flex items-center">
															{open ? (
																<MinusIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															) : (
																<PlusIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															)}
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-6">
													<div className="space-y-4">
														{section.options.map(
															(
																option,
																optionIdx,
															) => (
																<div
																	key={
																		option.value
																	}
																	className="flex items-center"
																>
																	<input
																		id={`filter-${section.id}-${optionIdx}`}
																		name={`${section.id}[]`}
																		defaultValue={
																			option.value
																		}
																		type="checkbox"
																		defaultChecked={
																			option.checked
																		}
																		className="h-4 w-4 rounded border-gray-600 text-[#ff6347] focus:ring-[#ff6347]"
																		onChange={(
																			e
																		) =>
																			handelFilter(
																				section.id,
																				option.value,
																				option.label,
																				e
																			)
																		}
																	/>
																	<label
																		htmlFor={`filter-${section.id}-${optionIdx}`}
																		className="ml-3 text-sm text-gray-500"
																	>
																		{
																			option.label
																		}
																	</label>
																</div>
															),
														)}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))}
								<div className="font-medium text-gray-900 mt-3">
									Price
								</div>
								<Slider
									sx={{ color: "#ff6347" }}
									size="small"
									getAriaLabel={() => "Temperature range"}
									value={priceValue}
									main={0}
									max={100000}
									onChange={(_, newvalue) =>
										setPriceValue(newvalue)
									}
									onChangeCommitted={(e, newvalue) =>
										handelPrice( newvalue)
									}
									valueLabelDisplay="auto"
									// getAriaValueText={valuetext}
								/>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",

									}}
								>
									<Typography
										variant="body2"
										
										sx={{ cursor: "pointer" ,fontWeight:'bold',fontSize:'18px'}}
									>
										${priceValue[0]}
									</Typography>
									<Typography
									
										sx={{ cursor: "pointer" ,fontWeight:'bold',fontSize:'18px' }}
									>
											${priceValue[1]}
									</Typography>
								</Box>
							</form>

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
