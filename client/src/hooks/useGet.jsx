import {useState,useEffect} from 'react'
import {getDataFromApi} from "../utilis/datafetch.js"

const useGet=(url)=>{

const [data,setdata]=useState()
const [loading,setLoading]=useState(false)
const[error , setError]=useState()

const fetchdata=async(url)=>{
try{
	const apidata=await getDataFromApi(url)
	setdata(apidata)
}
catch(err){
	console.log(err.response.data.message)
	setError(err.response)
}

}

useEffect(()=>{
	setLoading(true)
	setdata(null)
	fetchdata(url)
	setLoading(false)
},[url])


return {data,loading,error}

}
export default useGet