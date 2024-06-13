import mongoose from "mongoose";

const userSchema =new  mongoose.Schema({
    name:{
        type:String,
        requried:true
    },
    email:{
        type:String,
        requried:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    },

}, {minimize:false})

const userModel = mongoose.models.userModel || mongoose.model("userModel", userSchema)
export default userModel
