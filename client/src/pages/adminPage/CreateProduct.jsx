import React, { useState, useRef } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { createproductThunk } from "../../redux/slice/adminSlice.js";

function CreateProduct() {
	const [images, setImages] = useState([]);
	const dispatch = useDispatch();
	const ref = useRef();

	const onsubmit = (e) => {
		e.preventDefault();

		const fromdata = new FormData(ref.current);

		dispatch(createproductThunk(fromdata));
	};

	const handelchange = (e) => {
		const files = e.target.files;

		if (files.length == 0) return;

		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			reader.onload = () => {
				setImages((prev) => [...prev, reader.result]);
			};

			reader.readAsDataURL(e.target.files[i]);
		}
	};

	return (
		<>
			<form className="px-4" onSubmit={(e) => onsubmit(e)} ref={ref}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900 text-center">
							Product Information
						</h2>

						<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-4">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Product Name
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
										<input
											type="text"
											name="name"
											id="username"
											autoComplete="username"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Product name"
										/>
									</div>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="about"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Description
								</label>
								<div className="mt-2">
									<textarea
										id="about"
										name="description"
										rows={3}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										defaultValue={""}
									/>
								</div>
								<p className="mt-3 text-sm leading-6 text-gray-600">
									Write a few sentences about yourself.
								</p>
							</div>
							<div className="sm:col-span-4">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Product Price
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
										<input
											type="number"
											name="price"
											id="username"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Product price"
										/>
									</div>
								</div>
							</div>
							<div className="sm:col-span-4">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Catagory
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
										<input
											type="text"
											name="catagory"
											id="username"
											autoComplete="username"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Catagory"
										/>
									</div>
								</div>
							</div>
							<div className="sm:col-span-4">
								<label
									htmlFor="username"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Stock
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
										<input
											type="number"
											name="stock"
											id="username"
											autoComplete="username"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
											placeholder="Stock"
										/>
									</div>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="cover-photo"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Photo
								</label>
								<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
									<div className="text-center">
										<div className="flex gap-4 max-w-[333px] flex-wrap justify-center ">
											{images.length > 0 &&
												images.map((image, i) => (
													<div
														key={i}
														className="h-[100px] w-[100px] relative"
													>
														<span className="absolute top-0 right-0 text-red-700 text-xl font-bold">
															<RxCross2 />
														</span>

														<img
															src={image}
															alt=""
															className="w-full h-full"
														/>
													</div>
												))}
										</div>
										<div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
											<label
												htmlFor="file-upload"
												className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input
													id="file-upload"
													name="images"
													type="file"
													className="sr-only"
													accept="image/*"
													multiple
													onChange={handelchange}
												/>
											</label>
											<p className="pl-1">
												or drag and drop
											</p>
										</div>
										<p className="text-xs leading-5 text-gray-600">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="button"
						className="text-sm font-semibold leading-6 text-gray-900"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Save
					</button>
				</div>
			</form>
		</>
	);
}

export default CreateProduct;
