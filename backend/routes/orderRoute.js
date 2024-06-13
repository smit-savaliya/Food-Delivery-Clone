import express from "express"
import { placeorder, varifyOrder } from "../controllers/orderController.js"
import authMiddleware from "../middleware/auth.js"

const orderRouter = express.Router()

orderRouter.post("/place",authMiddleware,placeorder)
orderRouter.post("/verify",varifyOrder)

export default orderRouter
