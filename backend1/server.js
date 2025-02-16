import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/UserRoutes.js'
import 'dotenv/config'
import CartRouter from './routes/cartRoutes.js'
//import dotenv from "dotenv"
// dotenv.config({
//     path:'./.env'
// })


const app=express()
const port=4000

//middlewares
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",CartRouter)

app.get("/",(req,res)=>{
    res.send("API working")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})