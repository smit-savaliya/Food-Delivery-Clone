import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import ExplorMenu from '../../components/ExplorMenu/ExplorMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'

function Home() {

    const [category , setCetegory] = useState("All")
  return (
    <div>
        <Header/>
        <ExplorMenu category={category} setCetegory={setCetegory}/>
        <FoodDisplay category={category} />
        <AppDownload/>
    </div>
  )
}

export default Home
