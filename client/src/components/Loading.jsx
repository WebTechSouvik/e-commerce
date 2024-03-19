import React,{useEffect} from 'react'
import { toast } from "sonner";

const Loading = () => {
	useEffect(()=>{
	const id=toast.loading('Loading....');
	return(id)=>{
		toast.dismiss(id);
	}
	},[])
		
	
	return (
		<div className="w-screen h-screen fixed z-10  top-0 left-0">
			
		</div>
	)
}

export default Loading