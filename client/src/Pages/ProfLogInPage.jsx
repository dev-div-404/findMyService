import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfLogInPage = () => {

    axios.defaults.withCredentials = true;
    
    const navigate = useNavigate();

    const [info, setInfo] = useState({
        email: '',
        password: ''
    })

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URI}/getprof`).then(res =>{
            if(res.data.loggedin){
                navigate('/prof');
            }
        }).catch(err => console.log(err))
    },[])

    const infoChangeHandler = (event) =>{
       setInfo({...info, [event.target.name] : event.target.value})
    }

    const btnClickHandler = (e) =>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_SERVER_URI}/proflogin`,info).then(res =>{
            if(res.status === 200){
                console.log('log in successfully')
                navigate('/prof')
            }else alert(res.data.msg);
        }).catch(err => console.log(err));
    }
    
    return (
    <div>
        <Navbar />

        <div className='user-login-page-container'>
            <div className='log-in-form-wrapper'>
                <div className='log-in-text'>
                    Log In
                </div>

                <div className='log-in-form-container'>
                    <form className='log-in-form'>
                        <input type="email" placeholder='type email' name='email' value={info.email}onChange={infoChangeHandler}/>

                        <input type="password" placeholder='password' name='password' value={info.password}onChange={infoChangeHandler}/>

                        <button onClick={btnClickHandler}>log in</button>
                    </form>
                </div>
                <div className='log-in-text not-have-ac'>
                    don't have an account? <Link to = "/profsignup"> sign up here!</Link>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default ProfLogInPage