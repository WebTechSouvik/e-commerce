import axios from "axios";

export const getAllProduct = async (query) => {
	const { data } = await axios(
		"/api/v1/product" + query,
	);

	return data;
};
 export const getSingleProduct= async (id)=>{


 	const {data} =await axios("/api/v1/product/details" + id)
 	 return data;

 }

 export const addReview=async(id,reviewInfo)=>{

 	const configs={
 			headers:{
		"Content-Type":"application/json"
	},
	withCredentials:true
 	}

 	const {data}=await axios.post("/api/v1/product/review/" + id,reviewInfo,configs)
 	return data

 }