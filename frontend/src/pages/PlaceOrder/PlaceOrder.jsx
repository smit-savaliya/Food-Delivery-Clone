import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'

function PlaceOrder() {

  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <form className='placeorder'>
        <div className="placeorder-left">
            <p className='title'>Delivary Information </p>
            <div className="multi-filds">
              <input type="text" placeholder='First Name' />
              <input type="text" placeholder='Last Name' />
            </div>
            <input type="email" placeholder='Email' />
            <input type="text" placeholder='Street' />
            <div className="multi-filds">
              <input type="text" placeholder='City' />
              <input type="text" placeholder='State' />
            </div>
            <div className="multi-filds">
              <input type="text" placeholder='Zip Code' />
              <input type="text" placeholder='Country' />
            </div>
            <input type="text" placeholder='phone' />
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
          <button >PROCEED TO PAYMENT</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder
