import express from "express";
import cors from "cors"
import { errorhaldeler } from "./middeleware/errorMiddleware.js";
import cookieParser from "cookie-parser"
import fileupload from "express-fileupload"

const app = express();
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser())


import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import orderRouter from "./routes/orderRoute.js"
import cartRouter from "./routes/cartRoute.js"
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/cart",cartRouter)

app.use(errorhaldeler);

export { app };
