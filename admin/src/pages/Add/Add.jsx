import React, {  useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

function Add() {

    const url = "http://localhost:8080"

    const [image , setImage] = useState(false)
    const [data , setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })

    const onChangehandler = (event)=>{
        
        const name = event.target.name
        const value = event.target.value
        setData(data=>({...data , [name]:value}))
    }

    const onSubmitHandler =async (event)=>{
        event.preventDefault()
        console.log("form submit")
        const formData = new FormData()
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))
        formData.append("category", data.category)
        formData.append("image",image)

        const responce = await axios.post(`${url}/api/food/add`,formData)
        if(responce.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"
            })
            setImage(false)
            toast.success("Food Added...")
        }else{
            toast.error("Food not added..")
        }
        


    }


    

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-image-upload flex-col">
                    <p>Upload image</p>
                    <label  >
                        <img  src={image? URL.createObjectURL(image):assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image'  required />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangehandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangehandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-categoty flex-col">
                        <p>Product category</p>
                        <select onChange={onChangehandler} name="category" >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangehandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Add</button>


            </form>
        </div>
    )
}

export default Add
