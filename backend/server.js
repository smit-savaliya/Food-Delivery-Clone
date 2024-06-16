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
// app.use(cors())

const allowedOrigins = [
    "https://tomato-wx0c.onrender.com", // replace with your actual food app URL
    "https://admin-tomato.onrender.com" // replace with your actual admin panel URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

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



