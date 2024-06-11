import mongoose from "mongoose";
const url="mongodb+srv://thesmitsavaliya0717:tims0717@cluster0.tlwleho.mongodb.net/food-delivary"

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