import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    
    const {url , token} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifypayment = async()=>{
        try{
            console.log(`Success: ${success}, Order ID: ${orderId}`);
            const responce = await axios.post(url+"/api/order/verify", {success,orderId} , {headers:token})
        if(responce.data.success){
            navigate("/myorders")
        }else{
            
            navigate("/")
        }
        }catch(error){
            console.log(error)
            navigate("/")

        }

    }
    

    useEffect(()=>{
        
        verifypayment()
    }, [])

  return (
    <div className='verify'>
        <div className="spinner">
            
        </div>
    </div>
  )
}

export default Verify
