import axios from "axios"


export const getAdminProduct= async()=>{

	const configs={
		withCredentials:true

	}

const {data}=await axios("http://localhost:8000/api/v1/product/admin",configs)

return data

}

export const createProduct=async(productInfo)=>{

const configs ={
	headers:{
		"Content-Type":"multipart/form-data"
	},
	withCredentials:true
}

const {data}=await axios.post("http://localhost:8000/api/v1/product/admin",productInfo,configs)

return data;


}