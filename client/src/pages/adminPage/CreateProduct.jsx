import React, { useState, useRef, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	createproductThunk,
	updateProductThunk,
	clearError,
	clearMessage,
} from "../../redux/slice/adminSlice.js";
import Loading from "../../components/Loading.jsx";
import Metadata from "../../components/Metadata.jsx"
import { toast } from "sonner";

function CreateProduct() {
	const [images, setImages] = useState([]);
	const [imageFiles, setImageFiles] = useState([]);
	const [product, setproduct] = useState({});

	const dispatch = useDispatch();
	const ref = useRef();
	const { Id } = useParams();
	const { loading, message, error, products } = useSelector(
		(state) => state.admin,
	);

	const onsubmit = (e) => {
		e.preventDefault();

		const fromdata = new FormData(ref.current);
		fromdata.delete("images");
		console.log(imageFiles);
		imageFiles.forEach((file) => fromdata.append("images", file));

		if (Id) {
			dispatch(updateProductThunk({ id: Id, productInfo: fromdata }));
		} else {
			dispatch(createproductThunk(fromdata));
		}
	};

	const handelchange = (e) => {
		const files = Array.from(e.target.files);

		if (files.length == 0) return;

		setImageFiles([...imageFiles, ...files]);

		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = () => {
				setImages((prev) => [
					...prev,
					{ name: file.name, url: reader.result },
				]);
			};

			reader.readAsDataURL(file);
		});
	};

	const deleteImage = (index, fileName) => {
		const updateImages = images.filter((image, i) => i != index);
		setImages([...updateImages]);

		const updateImageFiles = imageFiles.filter(
			(file) => file.name != fileName,
		);
		setImageFiles([...updateImageFiles]);
	};

	useEffect(() => {
		if (Id) {
			const tempProduct = products.filter((product) => product._id == Id);
			setproduct(tempProduct[0]);
			const imageArray = tempProduct[0].images.map((image) => {
				return { url: image.url };
			});

			setImages([...imageArray]);
		} else {
			setproduct(null);
			setImages([]);
		}
	}, [Id]);

	useEffect(() => {
		if (message) {
			toast.success(message);
			dispatch(clearMessage());
		}

		if (error) {
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error, message]);

	return (
		<>
			<Metadata tittle="Create Product - Admin Panel"/>
			<form className="px-4" onSubmit={(e) => onsubmit(e)} ref={ref}>
				{loading && <Loading />}
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
											onChange={(e) =>
												setproduct({
													...product,
													name: e.target.value,
												})
											}
											value={product ? product.name : ""}
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
										onChange={(e) =>
											setproduct({
												...product,
												description: e.target.value,
											})
										}
										value={
											product ? product.description : ""
										}
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
											onChange={(e) =>
												setproduct({
													...product,
													price: e.target.value,
												})
											}
											value={product ? product.price : ""}
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
											onChange={(e) =>
												setproduct({
													...product,
													catagory: e.target.value,
												})
											}
											value={
												product ? product.catagory : ""
											}
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
											onChange={(e) =>
												setproduct({
													...product,
													stock: e.target.value,
												})
											}
											value={product ? product.stock : ""}
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
													{!Id &&	<span className="absolute top-0 right-0 text-red-700 text-xl font-bold cursor-pointer">
															<MdDeleteForever
																onClick={() =>
																	deleteImage(
																		i,
																		image.name,
																	)
																}
															/>
														</span>}

														<img
															src={image.url}
															alt=""
															className="w-full h-full"
														/>
													</div>
												))}
										</div>
										{!Id && (
											<>
												<div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
													<label
														htmlFor="file-upload"
														className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
													>
														<span>
															Upload a file
														</span>
														<input
															id="file-upload"
															name="images"
															type="file"
															className="sr-only"
															accept="image/*"
															multiple
															onChange={
																handelchange
															}
														/>
													</label>
													<p className="pl-1">
														or drag and drop
													</p>
												</div>
												<p className="text-xs leading-5 text-gray-600">
													PNG, JPG, GIF up to 10MB
												</p>
											</>
										)}
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
