// src/components/PostJobForm.js
import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const PostJobForm = () => {

  const navigate = useNavigate()
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  useEffect(() =>{
      axiosInstance.get(`${process.env.REACT_APP_SERVER_URI}/getuser`).then(res =>{
          if(!res.data.loggedin){
            navigate('/userlogin');
          }
      }).catch(err => console.log(err));
  },[])

  const [info, setInfo] = useState({
    jobtype: 'plumber',
    jobtitle: '',
    jobdesc: '', // Fix the typo here
    deadline: new Date().toISOString().split("T", 1)[0],
    location: '',
    zip : '',
    budget: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };

  const clearInfo = () =>{
    setInfo({
      jobtype: 'plumber',
      jobtitle: '',
      jobdesc: '', // Fix the typo here
      deadline: new Date().toISOString().split("T", 1)[0],
      location: '',
      zip : '',
      budget: '',
      phone: ''
    })
  }

  const clickButtonHandler = (event) =>{
    event.preventDefault();
    console.log(info);

    axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/addnewjob`, info).then(res =>{
        if(res.data.created){
          alert('new job created');
          navigate('/user');
        }else{
          alert('error creating job');
        }
    }).catch(err => console.log(err));

    clearInfo();
  }

  const clickCancelButtonHandler = () =>{
      navigate('/user')   
  }

  return (
    <div id='post-new-job-main-div'>
      <div id='post-job-form-container'>
        <form className="post-job-form">
          <h2 id='add-job-form-title'>Post a Job</h2>
          <select name='jobtype' value={info.jobtype} onChange={onChangeHandler}>
            <option value={'plumber'}>Plumber</option>
            <option value={'electrician'}>Electrician</option>
            <option value={'acservice'}>AC Service</option>
          </select>
          <input
            type='text'
            placeholder='Job Title'
            name='jobtitle'
            value={info.jobtitle}
            onChange={onChangeHandler}
          />
          <textarea
            name='jobdesc' // Fix the typo here
            placeholder='Job Description'
            value={info.jobdesc}
            onChange={onChangeHandler}
          />
          <input
            type='date'
            name='deadline'
            value={info.deadline}
            onChange={onChangeHandler}
          />
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={info.location}
            onChange={onChangeHandler}
          />
          <input
            type='number'
            placeholder='Zip Code'
            name='zip'
            value={info.zip}
            onChange={onChangeHandler}
          />
          <input
            type='number'
            placeholder='Budget'
            name='budget'
            value={info.budget}
            onChange={onChangeHandler}
          />
          <input
            type='number'
            placeholder='Contact Number'
            name='phone'
            value={info.phone}
            onChange={onChangeHandler}
          />
          
          <button onClick={clickButtonHandler}> Post Job </button>
          <button onClick={clickCancelButtonHandler} id='add-job-cancel-btn'> Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;
