import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function Verify() {

    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifypayment = async()=>{
        const responce = await axios.post(url+"/api/order/verify", {success,orderId})
        if(responce.data.success){
            navigate("/myorders")
        }else{
            navigate("/")
        }

    }

    useEffect(()=>{
        console.log(`Success: ${success}, Order ID: ${orderId}`);
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
