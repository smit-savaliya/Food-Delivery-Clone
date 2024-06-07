import React from 'react'
import "./ExplorMenu.css"
import { menu_list } from '../../assets/assets'

function ExplorMenu({category,setCetegory}) {
  return (
    <div className='explor-menu' id='explor-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explor-menu-text'>Choose your favourite food...and enjoy it</p>
        <div className="explor-menu-list">
            {
                menu_list.map((item , index)=>(
                    <div onClick={()=>setCetegory(prev=>prev===item.menu_name ?"All":item.menu_name)} key={index} className='explor-menu-list-item'>
                        <img  className={category===item.menu_name ?"active" :" "} src={item.menu_image} alt="" />
                        <p>{item.menu_name}</p>
                    </div>
                ))
            }
        </div>
      
        <hr />
    </div>
  )
}

export default ExplorMenu
