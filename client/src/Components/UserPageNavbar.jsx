import axios from 'axios';
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


const UserPageNavbar = (props) => {

    const opt = props.opt;
    const setOpt = props.setOpt;
    const userName = props.username;
    const navigate = useNavigate()

    const clickOptHandler = (event) =>{
        var targetName = event.currentTarget.getAttribute('name');
        setOpt(targetName);

        const allOptions = document.querySelectorAll('.userpage-navbar-opt');
        allOptions.forEach((option) => {
            option.classList.remove('active-opt');
        });

        event.currentTarget.classList.add('active-opt');
    }

    const axiosInstance = axios.create({
        withCredentials: true,
    });

    const logOutHandler = () =>{
        axiosInstance.get(`${process.env.REACT_APP_SERVER_URI}/userlogout`).then(res =>{
            navigate('/userlogin');
        }).catch(err => console.log(err))
    }

  return (
    <div className='userpage-navbar-main-div'>
        <div className='userpage-navbar-container'>
            <div className='userpage-navbar-options'>
                <div className='userpage-navbar-opt active-opt' name = 'dashboard' onClick={clickOptHandler}>
                    Dashboard
                </div>
            </div>
            <div className='userpage-navbar-user-options'>
                <div className='userpage-navbar-opt' name = 'userprofile' onClick={clickOptHandler}>
                    {userName}
                </div>
                <div className='userpage-navbar-opt' name = 'logout' id='logoutbtn' onClick={logOutHandler}>
                    log out
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserPageNavbar