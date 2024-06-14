import express from "express"
import { listOrders, placeorder, updateStatus, userOrders, varifyOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeorder)
orderRouter.post("/verify",varifyOrder)
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list" , listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter
