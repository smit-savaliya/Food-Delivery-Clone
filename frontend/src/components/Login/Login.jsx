import React, { useState } from 'react'
import "./Login.css"
import { assets } from '../../assets/assets'

function Login({setShowLogin}) {

    const [currentState , setCurrentState] = useState("LogIn")
  return (
    <div className='login'>
      <form action="" className="login-container">
        <div className="login-title">
            <h2>{currentState}</h2>
            <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-input">
            {currentState==="LogIn"?<></>: <input type="text" placeholder='Enter your name' required/>}
           
            <input type="email" placeholder='Enter your email'required/>
            <input type="password" placeholder='Password' required/>
        </div>
        <button>{currentState==="Sign Up"?"Create Account?":"LogIn"}</button>
        <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing , i agree to the  terms and use & privacy policy.</p>
        </div>
        {currentState==="LogIn"?
        <p>Create new account? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrentState("LogIn")}>Login here</span></p>}
        
       
      </form>
    </div>
  )
}

export default Login
