
import dotenv from "dotenv"

dotenv.config()

import connectDb from "./db/connectdb.js"
import {app} from "./app.js"


 app.get("/",(req,res)=>{
    res.send("hello")
 })

 connectDb().then(()=>{
 	app.listen(process.env.PORT,()=>{
	console.log("start server")
})
 }).catch((err)=>{
 	console.log(err)
 })

