import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import UserPageNavbar from '../Components/UserPageNavbar';
import UserDashBoard from '../Components/UserDashBoard';
import UserProfile from '../Components/UserProfile';
import Footer from './../Components/Footer'

const UserPage = () => {

  const axiosInstance = axios.create({
    withCredentials : true
  });

  const navigate = useNavigate();

  const [ userName, setUserName] = useState('');
  const [ userEmail, setUserEmail] = useState('');
  const [opt, setOpt] = useState('dashboard');

  useEffect(()=>{
    axiosInstance.get(`${process.env.REACT_APP_SERVER_URI}/getuser`).then(res =>{
        if(!res.data.loggedin){
            navigate('/userlogin');
        }else{
          setUserName(res.data.username);
          setUserEmail(res.data.useremail);
        }
    }).catch(err => console.log(err))
  },[opt]) 


  return (
    <div>
        <UserPageNavbar username = {userName} opt = {opt} setOpt = {setOpt}/>

      <div className='userpage-opt-div'>
        {
            opt === "dashboard" ? 
                  <UserDashBoard email = {userEmail} username = {userName}/> : 
            opt === "userprofile" ?
                  <UserProfile /> :
            <div> can't load page </div>
        }
      </div>
        <Footer />
    </div>
  )
}

export default UserPage