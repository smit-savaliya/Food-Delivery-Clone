import express from "express"
import cors from "cors"
import foodRoter from "./routes/foodRoute.js"
import {db} from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"



const app = express()


//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/food",foodRoter)
app.use("/images", express.static("uploads"))
app.use("/api/user",userRouter)
app.use("/api/cart/",cartRouter)
app.use("/api/order",orderRouter)


app.get("/" , (req,res)=>{
    res.send("backend coonected..")
})

const PORT = process.env.PORT || 8080
app.listen( PORT, ()=>{
    console.log("server is start...")
})



