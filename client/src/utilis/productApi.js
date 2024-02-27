import axios from "axios";

export const getAllProduct = async (query) => {
	const { data } = await axios(
		"http://localhost:8000/api/v1/product" + query,
	);

	return data;
};
 export const getSingleProduct= async (id)=>{


 	const {data} =await axios("http://localhost:8000/api/v1/product/details" + id)
 	 return data;

 }