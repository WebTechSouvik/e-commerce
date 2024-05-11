import React,{useEffect,useState} from 'react'
import {useParams } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {getOrderDetalisThunk,changeOrderStatus} from "../../redux/slice/orderSlice.js"
import {updateOrderThunk} from "../../redux/slice/adminSlice.js"
import ContentWrapper from "../../components/ContentWrapper.jsx"
import Cart from "../../components/Cart.jsx"
import {OrderStatusSteps} from "../../constant/orderConstant.js"
import OrderStep from "../../components/OrderStep.jsx"
import { useForm, SubmitHandler } from "react-hook-form";
import Metadata from "../../components/Metadata.jsx"

const OrderDetalisPage = () => {

	const {Id}=useParams()
	const dispatch=useDispatch()
	const {singleOrder}=useSelector((state)=>state.order)
	const {user} =useSelector((state)=>state.user)
	const [status,setStatus]=useState(1)
	const { register, handleSubmit } = useForm();


const handelOrderStatus=(data)=>{
	data.orderId=Id
	console.log(data)
	dispatch(updateOrderThunk(data))
	dispatch(changeOrderStatus(data.orderStatus))

}



useEffect(()=>{
dispatch(getOrderDetalisThunk(Id))
},[])

useEffect(()=>{
	if(singleOrder){
		switch(singleOrder.orderStatus){
			case "delivered":
			setStatus(3)
			break
			case "shipping":
			setStatus(2)
			break
			default:
    		setStatus(1)
		}
	}
},[singleOrder])
	return (
		<>
		<Metadata tittle="Order Details - Ecommerce"/>
		{singleOrder && <ContentWrapper>
		<div className="mt-[100px]">
			<span className="text-2xl font-semibold">Order ID</span>
			<h1 className="text-gray-400 lg:text-2xl">#{singleOrder._id}</h1>
		</div>
		<div className="mt-8 bg-white px-5 ">
		<h3 className="border-b border-solid  border-black w-max mx-auto px-5 text-xl pb-2 pt-2">
					Order Items
				</h3>
			{
				singleOrder.orderItems.map((item)=><Cart product={item.product} quantity={item.quantity} isCartPAge={false}/>)
			}
		</div>
		{user.role=="admin" && <div className="mt-4">
				<h1 className="text-xl font-bold">Process Order</h1>
				<form action="" className="flex flex-col gap-3 w-max mt-2" onSubmit={handleSubmit(handelOrderStatus)}>
					<select {...register("orderStatus")} className="focus:ring-2 focus:border-none focus:ring-inset focus:ring-[#ff6347]">
						<option value="">Choose Catagory</option>
						<option value="shipping" className="hover:text-2xl">Shipping</option>
						<option value="delivered">Delivered</option>
					</select>
					<button type="submit" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 w-36 text-base font-medium text-white shadow-sm hover:bg-indigo-700">CREATE</button>
				</form>
		</div>}
		<div className="mt-10">
		<h1 className="text-xl font-bold mb-6">Order Status</h1>
			<OrderStep active={status} steps={OrderStatusSteps}/>
		</div>

		<div className="mt-12">
			<h1 className="text-xl font-bold">Shipping Info</h1>
			<div className="mt-2">
				<p><span className="font-semibold">Address: </span><span  className="text-gray-500">{singleOrder.shipingInfo.address}</span></p>
				<p><span className="font-semibold">City: </span><span className="text-gray-500">{singleOrder.shipingInfo.city}</span></p>
				<p><span className="font-semibold">State: </span><span className="text-gray-500">{singleOrder.shipingInfo.state}</span></p>
				<p><span className="font-semibold">Country: </span><span className="text-gray-500">{singleOrder.shipingInfo.country}</span></p>
				<p><span className="font-semibold">Pin Code: </span><span className="text-gray-500">{singleOrder.shipingInfo.pincode}</span></p>
			</div>
		</div>
		<div className="mt-4 mb-6">
			<h1 className="text-xl font-bold">Payment</h1>
			<div className="mt-2">
				<p><span className="font-semibold">Tax Price: </span><span className="text-gray-500">{singleOrder.taxprice}</span></p>
				<p><span className="font-semibold">Shipping Price: </span><span className="text-gray-500">{singleOrder.shippingPrice}</span></p>
				<p><span className="font-semibold">Total Price: </span><span className="text-gray-500">{singleOrder.totalPrice}</span></p>
				
			</div>
		</div>
	
		
		</ContentWrapper>}
		
		</>
	)
}

export default OrderDetalisPage