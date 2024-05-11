import React, { useState, useRef, useEffect } from "react";
import Profile from "../../images/Profile.png";
import { userRegisterThunk, clearError,clearMessage } from "../../redux/slice/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading.jsx";
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { PiSignInBold } from "react-icons/pi";
import Metadata from "../../components/Metadata.jsx"
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"

const RegisterPage = () => {
	const [filePreview, setFilePreview] = useState();
	const ref = useRef();
	const dispatch = useDispatch();
	const navigate=useNavigate()
    const { register,handleSubmit,  formState: { errors } } = useForm();
	const { loading,isAuthinticated, message, error } = useSelector((state) => state.user);

	const registerSubmit = (data) => {
	
const newdata={...data,file:data.file[0],role:!data.role?"user":"admin"}
console.log(data.file)
		const fromdata = new FormData(ref.current);

		dispatch(userRegisterThunk(newdata));
	};
	const handelChange = (e) => {
		const filereader = new FileReader();

		filereader.onload = () => {
			setFilePreview(filereader.result);
		};
		filereader.readAsDataURL(e.target.files[0]);
	};
	useEffect(()=>{
		if(isAuthinticated){
			navigate("/")
		}

	},[isAuthinticated])
	useEffect(() => {
		if (message){
			toast.success(message);
			dispatch(clearMessage());
			navigate("/login")
		} 

		if (error) {
			toast.error(error.message);
			dispatch(clearError());
		}
	}, [error, message]);
	return (
		<>
		<Metadata tittle="Sign Up - Ecommerce"/>
			<div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 mt-20">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Register
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={handleSubmit(registerSubmit)}
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
								 {...register("username",{required: true,})}
									type="text"
									autoComplete="email"
									// required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{errors?.username?.type === "required" && <p className="text-red-500">This field is required</p>}
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
								 {...register("fullname",{required: true,})}
									type="text"
									autoComplete="email"
									// required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{errors?.fullname?.type === "required" && <p className="text-red-500">This field is required</p>}
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
									 {...register("email",{required: true,})}
									type="email"
									autoComplete="email"
									// required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							 {errors?.email?.type === "required" && <p className="text-red-500">This field is required</p>}
						</div>
						  
						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									{...register("password",{required: true,})}
									type="password"
									autoComplete="current-password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
							{errors?.password?.type === "required" && <p className="text-red-500">This field is required</p>}
						</div>
					 
						<div>
							<div className="mt-2 flex items-center gap-2">
								<div className="max-w-[45px] max-h-[40px] rounded-3xl overflow-hidden ">
									<img
										src={
											!filePreview ? Profile : filePreview
										}
										alt=""
										className="w-full aspect-square object-cover"
									/>
								</div>
								<input
									id="email"
									name="file"
									 {...register("file")}
									type="file"
									// required
									onChange={(e) => handelChange(e)}
									className="w-full file:border-none file:bg-white border-2 border-indigo-600 file:w-full file:py-2 font-semibold rounded-md"
								/>
							</div>
						</div>
						<div className="flex items-center justify-end">
						<input
						name="role"
						    {...register("role")}
						value="admin"
							type="checkbox"
							className="h-4 w-4 rounded border-gray-600 ring-indigo-500 focus:ring-indigo-500"
						/>
						<label className="ml-3 text-md  text-[#ff6347] font-semibold ">
							Become a admin
						</label>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Sign up
							</button>
						</div>
					</form>
				</div>
				<div className ="flex gap-2 items-center mt-3">
					<PiSignInBold className="text-xl" />
					<p>Already have account?</p>
					<Link to="/login" className="text-[#ff6347]">Sign in</Link>
				</div>
			</div>
			{loading && <Loading />}
		</>
	);
};

export default RegisterPage;
