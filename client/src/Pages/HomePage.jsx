import React from 'react'
import Navbar from '../Components/Navbar'
import HomepageBody from '../Components/HomepageBody'
import Footer from '../Components/Footer'

const HomePage = () => {
  return (
    <div className='homepage-mail-div'>
            <Navbar />
            <HomepageBody />
            <Footer />
    </div>
  )
}

export default HomePage