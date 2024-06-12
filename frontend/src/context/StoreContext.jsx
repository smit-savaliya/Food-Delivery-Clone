import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null)

import { food_list } from "../assets/assets";

const StoreContextprovider = (props)=>{

    const [cartItems , setCartItems] = useState({})
    const url = "http://localhost:8080"
    const [token , setToken] = useState("")
    
    const addToCart = (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev,  [itemId]:1}))
        }
        else{
            setCartItems(prev=>({...prev,  [itemId]:prev[itemId]+1}))
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,  [itemId]:prev[itemId] -1}))
    }

    const getTotalCartAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItems){
                if(cartItems[item] > 0){
                    let itemInfo = food_list.find((product)=>product._id === item)
                    totalAmount+= itemInfo.price*cartItems[item]
                }
        }
        return totalAmount

    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
        }
    })



    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextprovider