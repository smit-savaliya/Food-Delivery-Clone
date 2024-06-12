import React, { useContext, useEffect, useState } from 'react'
import "./List.css"
import axios from 'axios'
import { toast } from 'react-toastify'

function List({url}) {
 

  const [list , setList] =useState([])
  

  const fetchList = async()=>{
    const responce = await axios.get(`${url}/api/food/list`)
    console.log(responce.data)
    if(responce.data.success){
      setList(responce.data.data)
    }else{
      toast.error("Error..")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  const removeFood = async(foodid)=>{
    const responce=await axios.post(`${url}/api/food/remove`, {id:foodid})
    await fetchList()
    if(responce.data.success){
      toast.success(responce.data.message)
    }else{
      toast.error("Error..")
    }
  }
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
              <b>Image</b>
              <b>Name</b>
              <b>Category</b>
              <b>Price</b>
              <b >Action</b>
        </div>

        {
          list.map((item, index)=>{
            return (
              <div key={index} className='list-table-format'>
                  <img src={`${url}/images/`+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>  
            )
          })
        }
      </div>
    </div>
  )
}

export default List
