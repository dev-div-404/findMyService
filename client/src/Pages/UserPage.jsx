import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import UserPageNavbar from '../Components/UserPageNavbar';
import UserDashBoard from '../Components/UserDashBoard';
import UserPostedJobs from '../Components/UserPostedJobs';
import UserProfile from '../Components/UserProfile';

const UserPage = () => {

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [ userName, setUserName] = useState('');
  const [opt, setOpt] = useState('dashboard');

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URI}/getuser`).then(res =>{
        if(!res.data.loggedin){
            alert('need to log in first');
            console.log('helo')
            navigate('/userlogin');
        }else{
          setUserName(res.data.username);
        }
    }).catch(err => console.log(err))
  },[opt]) 


  return (
    <div>
        <UserPageNavbar username = {userName} opt = {opt} setOpt = {setOpt}/>

        {
          opt === "dashboard" ? 
                <UserDashBoard /> : 
          opt === "postedjobs" ?
                <UserPostedJobs /> :
          opt === "userprofile" ?
                <UserProfile /> :
                <div> can't load page </div>
        }
    </div>
  )
}

export default UserPage