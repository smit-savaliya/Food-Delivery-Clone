import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function PlaceOrder() {

  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangehandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const placeorder = async (event) => {
    event.preventDefault()
    let orderItems = []

    food_list.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = {...item}
        itemInfo["quantity"] = cartItems[item._id]

        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address:data,
      items: orderItems,
      amount:getTotalCartAmount()+2
    }

    let responce = await axios.post(url+"/api/order/place" , orderData,{headers:{token}})

    if(responce.data.success){
      const {session_url} = responce.data
      window.location.replace(session_url)
    }else{
      alert("Error..")
    }


  }

  const navigate = useNavigate()

  useEffect(() => {
    if(!token){
      navigate("/cart")
    }else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  }, [token])

  


  return (
    <form className='placeorder' onSubmit={placeorder}>
      <div className="placeorder-left">
        <p className='title'>Delivary Information </p>
        <div className="multi-filds">
          <input required name='firstName' onChange={onChangehandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangehandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Email' />
        <input required name='street' onChange={onChangehandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-filds">
          <input required name='city' onChange={onChangehandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangehandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-filds">
          <input required name='zipcode' onChange={onChangehandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangehandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangehandler} value={data.phone} type="text" placeholder='phone' />
      </div>

      <div className="placeorder-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivary Fee</p>
            <p>${2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Total</p>
            <p>${getTotalCartAmount() + 2}</p>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
