import express from "express";
import cors from "cors"
import { errorhaldeler } from "./middeleware/errorMiddleware.js";
import cookieParser from "cookie-parser"
import fileupload from "express-fileupload"
import path from "path"

const app = express();
app.use(cors({
    origin:["http://192.168.0.105:3000","http://localhost:3000"],
    credentials: true
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser())

const __dirname1=path.resolve()
app.use(express.static(path.join(__dirname1,"/client/build")))

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js"
import cartRouter from "./routes/cartRoute.js"
import paymentRouter from "./routes/paymentRoute.js"


app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/payment",paymentRouter)

app.use(errorhaldeler);
app.get("*",(req,res)=>{
    res.send(path.resolve(__dirname1,"client","build","index.html"))
})

export { app };
