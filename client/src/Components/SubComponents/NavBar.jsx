import React from 'react'
import './navbar.css'
import logo from './logo.avif'
import navBarList from './NavBarOptions'
import { Link } from 'react-router-dom'


const NavBar = () => {
  return (
    <div>
    <div className='navbar'>

        <img  className='logo' src= {logo} alt='logo'></img>

        <div className='siteName'>
            <Link to = '/' className = 'siteName' style={{textDecoration : 'none'}}>
              Find My Service
            </Link>
        </div>

        <div className='navbarOptionList'>
            {navBarList.map((option)=>(
                <Link key={option.key} to = {option.link} className='navbarOptions'> {option.text} </Link>
             ))}
            
        </div>

       <div className='navbarloginContainer'>
            <div className='navbarlogin'>
                <a href='##login##'>login</a>
            </div>
       </div>

    </div>
    </div>
  )
}

export default NavBar