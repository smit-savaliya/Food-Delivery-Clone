import mongoose from "mongoose";
import "dotenv/config"
const url= process.env.MONGODB_URL

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection

db.on("connected",()=>{
    console.log("Mongo db connected....")
})
db.on("error",(e)=>{
    console.log("mongodb connection error  ===> ",e)
})
db.on("disconnected",()=>{
    console.log("mongodb server disconnected....")
})

export {db}