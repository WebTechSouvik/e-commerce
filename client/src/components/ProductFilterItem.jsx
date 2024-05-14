import React from "react";
import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllProductThunk,
	updateFilter,
	resetFilterItem,
	addFilter,
	removeFilter,
	changePrice,
	resetPage,
} from "../redux/slice/productSlice.js";
import { Slider } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";

const ProductFilterItem = ({ isMobile, keyword }) => {


	const { filterItem,price } = useSelector((state) => state.product);
		const [priceValue, setPriceValue] = useState([...price]);
	const dispatch = useDispatch();

	const handelFilter = (key, value, label, e) => {
		if (key == "catagory") {
			if (e.target.checked) {
				dispatch(addFilter(value));
			} else {
				dispatch(removeFilter(value));
			}
		}
		dispatch(updateFilter({ id: key, label }));
	};

	const handelPrice = (value) => {
		dispatch(changePrice(value));
	};

	useEffect(() => {
		if (keyword) {
			dispatch(resetFilterItem());
			setPriceValue([0, 100000]);
		}
	}, [keyword]);

	return (
		<form className={`${isMobile ? "px-4 lg:hidden" : "hidden lg:block"}`}>
			<span className="text-2xl pb-2">Filters</span>
			{filterItem.map((section) => (
				<Disclosure
					as="div"
					key={section.id}
					className="border-b border-gray-400 py-6"
				>
					{({ open }) => (
						<>
							<h3 className="-my-3 flow-root">
								<Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
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
										(option, optionIdx) => (
											<div
												key={option.value}
												className="flex items-center"
											>
												<input
													id={`filter-${section.id}-${optionIdx}`}
													name={`${section.id}[]`}
													defaultValue={option.value}
													type="checkbox"
													checked={option.checked}
													className="h-4 w-4 rounded border-gray-600 text-[#ff6347] focus:ring-[#ff6347]"
													onChange={(e) =>
														handelFilter(
															section.id,
															option.value,
															option.label,
															e,
														)
													}
												/>
												<label
													htmlFor={`filter-${section.id}-${optionIdx}`}
													className="ml-3 text-sm text-gray-500"
												>
													{option.label}
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
			<div className="font-medium text-gray-900 mt-3">Price</div>
			<Slider
				sx={{ color: "#ff6347" }}
				size="small"
				getAriaLabel={() => "Temperature range"}
				value={priceValue}
				main={0}
				max={100000}
				onChange={(_, newvalue) => setPriceValue(newvalue)}
				onChangeCommitted={(e, newvalue) => handelPrice(newvalue)}
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
					sx={{
						cursor: "pointer",
						fontWeight: "bold",
						fontSize: "18px",
					}}
				>
					${priceValue[0]}
				</Typography>
				<Typography
					sx={{
						cursor: "pointer",
						fontWeight: "bold",
						fontSize: "18px",
					}}
				>
					${priceValue[1]}
				</Typography>
			</Box>
		</form>
	);
};

export default ProductFilterItem;
