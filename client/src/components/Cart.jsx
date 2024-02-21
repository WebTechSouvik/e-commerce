import React from 'react'
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import {deleteItem,deleteItemsThunk} from "../redux/slice/cartSlice.js"

function Cart({product}) {
	const {cartItems}=useSelector((state)=>state.cart)
	const dispatch=useDispatch()

	const removeItem=()=>{
dispatch(deleteItem(product._id))
dispatch(deleteItemsThunk(product._id))




	}
	
	return (
			<li  className="flex pb-4 pt-8">
								<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md ">
									<img
										src={product.images[0]}
										alt="product"
										className="h-full w-full object-contain"
									/>
								</div>

								<div className="ml-4 flex flex-1 flex-col">
									<div>
										<div className="flex justify-between text-base font-medium text-gray-900 items-center">
											<h3>
												<Link to={`/product/${product._id}`}>
													{product.name}
												</Link >
											</h3>

									
											<p className="ml-4">
												{product.price}
											</p>
										</div>
										<p className="mt-1 text-sm text-gray-500">
											{product.catagory}
										</p>
									</div>
									<div className="flex flex-1 items-center justify-between text-sm">
											<div className="flex ">
											<button className="px-1 bg-gray-600">
												+
											</button>
											<p className="px-2  ">
												1
											</p>
											<button className="px-1 b bg-gray-600 ">
												-
											</button>
										</div>
										
										<div className="flex">

											<button
												type="button"
												className="font-medium text-red-500 hover:text-red-700"
												onClick={removeItem}
											>
												Remove
											</button>
										</div>
									</div>
								</div>

							</li>
	)
}

export default Cart