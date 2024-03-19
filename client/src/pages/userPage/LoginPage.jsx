import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginThunk,userDetalisThunk,clearError } from "../../redux/slice/userSlice.js"
import { useNavigate,Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { toast } from 'sonner';

const Loginpage = () => {
	const ref = useRef();
	const dispatch = useDispatch();
	const {isAuthinticated,error} = useSelector((state) => state.user);
	const navigate = useNavigate();


	const loginsubmit = (e) => {
		e.preventDefault();

		const fromdata = new FormData(ref.current);

		dispatch(userLoginThunk(fromdata));
	};

	useEffect(() => {
		if (isAuthinticated) {
			dispatch(userDetalisThunk())
			navigate(-1,{replace:true});
			toast.success('Loggin Successfully');
		}
		if(error){
			toast.error(error.message)
			dispatch(clearError())
		}
	},[isAuthinticated,error]);

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form
					className="space-y-6"
					onSubmit={(e) => loginsubmit(e)}
					ref={ref}
				>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							username
						</label>
						<div className="mt-2">
							<input
								id="email"
								name="username"
								type="text"
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
								
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
				<div className="flex gap-1 items-center w-full justify-center mt-3"><CgProfile/><span>New member?</span><Link to="/register" className="text-[#ff6347]"> Create a account</Link></div>
			</div>
		</div>
	);
};

export default Loginpage;
