import express from "express"
import { addFood, listFood, removeFood } from "../controllers/foodController.js"
import multer from "multer"
import path from "path";

const foodRoter = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null , `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})



foodRoter.post("/add",upload.single("image"),addFood)
foodRoter.get("/list",listFood)
foodRoter.post("/remove",removeFood)




export default foodRoter