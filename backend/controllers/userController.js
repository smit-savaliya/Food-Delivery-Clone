import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
    
}

//login user
const loginUser = async(req,res)=>{
    const {email ,password} = req.body

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User Does't  Exits.."})
        }

        const isMatch = await  bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success:false , message:"Password is Wrong......"})

        }

        const token = createToken(user._id)
        res.json({success:true , token})

    } catch (error) {
        console.log(error)
        res.json({success:false , message:"Error.."})
    }
}



//register user
const registeUser = async(req,res)=>{
    const {name,password,email} = req.body
    try{
        //cheking if user already exists.
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false , message:"User already exists.."})
        }

        //validating emial formate and strong password
        if(!validator.isEmail(email)){
            res.json({success:false , message:"Please enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false, message:"Please enter a storng password.."})
        }

        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password , salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})




    }catch(err){
        console.log(err)
        res.json({success:false , message:"error..."})
    }
}

export {loginUser , registeUser}
