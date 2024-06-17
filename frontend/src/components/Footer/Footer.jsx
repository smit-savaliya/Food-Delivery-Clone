import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className="footer-content-left">
                    <img src={assets.logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente commodi modi sed, corrupti, impedit nam vero quos officia, facere nobis deleniti tenetur. Eveniet, distinctio sapiente.</p>
                    <div className="footer-social-icon">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>

                <div className="footer-content-center">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About US</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 9909623827</li>
                        <li>smit.savaliya1717@gmail.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p className='footer-copyright'>
                Copyright   2024 Tomato.com -All Right Reserved.
            </p>
        </div>
    )
}

export default Footer
