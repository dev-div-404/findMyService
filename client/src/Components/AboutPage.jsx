import React from 'react'
import NavBar from './SubComponents/NavBar'
import Footer from './SubComponents/Footer'
import AboutPageBody from './SubComponents/AboutPageBody'

const AboutPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <AboutPageBody />
        <Footer />
    </div>
  )
}

export default AboutPage