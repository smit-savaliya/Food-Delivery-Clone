import express from "express"
import cors from "cors"
import foodRoter from "./routes/foodRoute.js"
import {db} from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import "dotenv/config"


const app = express()
const PORT = 8080

//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use("/api/food",foodRoter)
app.use("/images", express.static("uploads"))
app.use("/api/user",userRouter)


app.get("/" , (req,res)=>{
    res.send("backend coonected..")
})

app.listen(PORT , ()=>{
    console.log("server is start...")
})



