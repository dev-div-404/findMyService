import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-main-div'>
        <div className='site-name navbar-elements navbar-detail-opt'>
            <Link to= '/' id='site-name'>Find My Service</Link>
        </div>

        <div className='navbar-options navbar-elements'>
            <div className='navbar-detail-opt'>
                <Link to= '/'>Home</Link>
            </div>

            <div className='navbar-detail-opt'>
                <Link to= '/about'>About</Link>
            </div>
            
            <div className='navbar-detail-opt'>
                <Link to= '/contact'>Contact</Link>
            </div>
        </div>

        <div className='navbar-elements navbar-detail-opt navbar-login-container'>
            <div className='navbar-login-opt'>
                <Link to= '/proflogin'>
                    professionals-login
                </Link>
            </div>

            <div className='navbar-login-opt'>
                <Link to= '/userlogin'>
                    user-login
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar