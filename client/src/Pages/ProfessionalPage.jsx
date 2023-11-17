import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import ProfProfile from '../Components/ProfProfile';
import Footer from './../Components/Footer'
import ProfPageNavbar from '../Components/ProfPageNavbar';
import ProfDashBoard from '../Components/ProfDashBoard';

const ProfessionalPage = () => {

  const axiosInstance = axios.create({
    withCredentials: true,
});

  const navigate = useNavigate();

  const [ profName, setProfName] = useState('');
  const [ profEmail, setProfEmail] = useState('');
  const [opt, setOpt] = useState('dashboard');

  useEffect(()=>{
    axiosInstance.get(`${process.env.REACT_APP_SERVER_URI}/getprof`).then(res =>{
        if(!res.data.loggedin){
            navigate('/proflogin');
        }else{
          setProfName(res.data.profname);
          setProfEmail(res.data.profemail);
        }
    }).catch(err => console.log(err))
  },[opt]) 


  return (
    <div>
        <ProfPageNavbar username = {profName} opt = {opt} setOpt = {setOpt}/>
      <div className='userpage-opt-div'>
        {
            opt === "dashboard" ? 
                  <ProfDashBoard email = {profEmail} username = {profName}/> : 
            opt === "userprofile" ?
                  <ProfProfile /> :
            <div> can't load page </div>
        }
      </div>
        <Footer />
    </div>
  )
}

export default ProfessionalPage