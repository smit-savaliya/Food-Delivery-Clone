import foodModel from "../models/foodModel.js";
import fs from "fs"


//add food item
const addFood = async (req,res)=>{

    let img_filename = `${req.file.filename}`
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:img_filename
    })

    try{
        await food.save()
        res.json({success:true , message:"Food Added"})
    }catch(err){
        console.log(err)
        res.json({success:false , message:"Error"})
    }
}

export {addFood}