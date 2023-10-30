import React from 'react'
import NavBar from './SubComponents/NavBar'
import HomePageBody from './SubComponents/HomePageBody'
import Footer from './SubComponents/Footer'


const HomePage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <HomePageBody />
        <Footer />
    </div>
  )
}

export default HomePage