import React, { useState, useRef } from "react";
import Profile from "../images/Profile.png";
import { userRegisterThunk } from "../redux/slice/userSlice.js";
import { useDispatch } from "react-redux";

const RegisterPage = () => {
	const [filePreview, setFilePreview] = useState();
	const ref = useRef();
	const dispatch = useDispatch();

	const regidterSubmit = (e) => {
		e.preventDefault();

		const fromdata = new FormData(ref.current);


		dispatch(userRegisterThunk(fromdata))
	};
	const handelChange = (e) => {
		const filereader = new FileReader();

		filereader.onload = () => {
			setFilePreview(filereader.result);
		};
		filereader.readAsDataURL(e.target.files[0]);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Register
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					onSubmit={(e) => regidterSubmit(e)}
					ref={ref}
				>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							User Name
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="username"
								type="text"
								autoComplete="email"
								// required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Full Name
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="fullname"
								type="text"
								autoComplete="email"
								// required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Email address
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								// required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Password
							</label>
							<div className="text-sm">
								<a
									href="#"
									className="font-semibold text-indigo-600 hover:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>
						</div>
						<div className="mt-2">
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
							
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>
					<div>
						<div className="mt-2 flex items-center gap-2">
							<div className="max-w-[45px] max-h-[40px] rounded-3xl overflow-hidden ">
								<img
									src={!filePreview ? Profile : filePreview}
									alt=""
									className="w-full aspect-square object-cover"
								/>
							</div>
							<input
								id="email"
								name="file"
								type="file"
								// required
								onChange={(e) => handelChange(e)}
								className="w-full file:border-none file:bg-white border-2 border-indigo-600 file:w-full file:py-2 font-semibold rounded-md"
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign in
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
