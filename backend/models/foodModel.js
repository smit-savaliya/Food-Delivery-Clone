import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    
})

const foodModel =mongoose.model.foodModel || mongoose.model("foodModel",foodSchema)
export default foodModel