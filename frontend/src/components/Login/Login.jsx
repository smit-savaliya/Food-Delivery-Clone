import React, {  useContext, useState } from 'react'
import "./Login.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

function Login({ setShowLogin }) {

  const {url , token , setToken} = useContext(StoreContext)

  const [currentState, setCurrentState] = useState("LogIn")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prev=>({...prev,[name]:value}))

  }


  const onLogin = async(event)=>{
    event.preventDefault()
    let newUrl = url
    if(currentState=="LogIn"){
      newUrl += "/api/user/login"
    }else{
      newUrl += "/api/user/register"
    }

    const respoce = await axios.post(newUrl,data)
    if(respoce.data.success){
        setToken(respoce.data.token)
        localStorage.setItem("token",respoce.data.token)
        setShowLogin(false)
    }else{
      alert(respoce.data.message)
    }

  }
  
  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currentState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-input">
          {currentState === "LogIn" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter your name' required />}

          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        <button type='submit'>{currentState === "Sign Up" ? "Create Account?" : "LogIn"}</button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing , i agree to the  terms and use & privacy policy.</p>
        </div>
        {currentState === "LogIn" ?
          <p>Create new account? <span onClick={() => setCurrentState("Sign Up")}>Click Here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrentState("LogIn")}>Login here</span></p>}


      </form>
    </div>
  )
}

export default Login
