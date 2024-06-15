import OrderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend
const placeorder = async (req,res)=>{

    const frontend_url = "https://tomato-wx0c.onrender.com"
    try {
        const newOrder = new OrderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address

        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_itmes = req.body.items.map((item)=>({
            price_data :{
                currency:"INR",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*80
            },
            quantity:item.quantity
        }))

        line_itmes.push({
            price_data:{
                currency:"INR",
                product_data:{
                    name:"Delivery Changes"
                },
                unit_amount:2*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_itmes,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,

        })

        res.json({success:true , session_url:session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:"Error.."})
    }
}

const varifyOrder = async(req,res)=>{
    const {orderId,success} = req.body
    try {
        if(success==="true"){
            await OrderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true, message:"Paid"})
        }else{
            await OrderModel.findByIdAndDelete(orderId)
            res.json({success:false, message:"Not Paid"})
        }
    } catch (error) {
            console.log(error)
            res.json({success:false , message:"Error.."})
    }
}

//user order for frontend
const userOrders = async(req,res)=>{
    try {
        const orders = await OrderModel.find({userId:req.body.userId})
        res.json({success:true , data:orders})
    } catch (error) {
            console.log(error);
            res.json({success:true , message:"Error.."})
    }
}

//listing order for admin panel
const listOrders = async(req,res)=>{
    try {
        const orders = await OrderModel.find({})
        res.json({success:true , data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false , message:"Error.."})
    }
}


//api for updating order status
const updateStatus = async(req,res)=>{
    try {
        await OrderModel.findByIdAndUpdate(req.body.orderId , {status:req.body.status});
        res.json({success:true , message:"Status updated.."})

    } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error.."})
    }
}


export {placeorder , varifyOrder , userOrders , listOrders , updateStatus}