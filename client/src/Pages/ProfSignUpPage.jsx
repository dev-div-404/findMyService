import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfSignUpPage = () => {

    const axiosInstance = axios.create({
        withCredentials: true,
    });
    const navigate = useNavigate()

    
    
    const [info, setInfo] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        cpassword: '',
        zip: '',
        jobtype : ''
        
    })

    const machesPassword = () =>{
        if(info.password === info.cpassword)
            return true;
        return false;
    }

    const cleanInfo = () =>{
        setInfo({
            name: '',
            phone: '',
            email: '',
            password: '',
            cpassword: '',
            zip: '',
            jobtype : ''
        })
    }

    const infoChangeHandler = (event) =>{
       setInfo({...info, [event.target.name] : event.target.value})
    }

    const btnClickHandler = (e) =>{
        e.preventDefault();
        if(!machesPassword())
        {
            alert('password and confirm password is not same')
        }else{
            axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/profsignup`,info).then(res =>{
                if(res.status === 200){
                    alert('user registered as professonal');
                    navigate('/proflogin')
                }else{
                    alert(res.data.msg);
                }
            }).catch(err => console.log(err))
        }
        cleanInfo();
    }
    
    return (
    <div>
        <Navbar />

        <div className='user-login-page-container'>
            <div className='log-in-form-wrapper'>
                <div className='log-in-text'>
                    Sign Up
                </div>

                <div className='log-in-form-container'>
                    <form className='log-in-form signup-form'>
                        <input type="text" placeholder='name' name='name' value={info.name} onChange={infoChangeHandler}/>

                        <select name='jobtype' value={info.jobtype} onChange={infoChangeHandler}>
                            <option value={'plumber'}>Plumber</option>
                            <option value={'electrician'}>Electrician</option>
                            <option value={'acservice'}>AC Service</option>
                        </select>

                        <input type="number" placeholder='10 digit phone' name='phone' value={info.phone} onChange={infoChangeHandler}/>

                        <input type="email" placeholder='email' name='email' value={info.email} onChange={infoChangeHandler}/>
                        
                        <input type="password" placeholder='password' name='password' value={info.password} onChange={infoChangeHandler}/>

                        <input type="password" placeholder='confirm password' name='cpassword' value={info.cpassword} onChange={infoChangeHandler}/>

                        <input type="number" placeholder='Zip Code' name='zip' value={info.zip} onChange={infoChangeHandler}/>

                        <button onClick={btnClickHandler}>sign up</button>
                    </form>
                </div>
                <div className='log-in-text not-have-ac'>
                    have an account? <Link to = "/proflogin"> sign in here!</Link>
                </div>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default ProfSignUpPage