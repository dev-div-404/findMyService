import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProfJobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  axios.useCredentials = true;

  const [info, setInfo] = useState({
    jobtype: '',
    jobtitle: '',
    jobdesc: '', 
    deadline: '',
    postdate : '',
    location: '',
    zip : '',
    budget: '',
    phone: '',
    active : true
  });

  const [offer, setOffer] = useState({
    profcost : '',
    profmsg : ''
  });

  useEffect(()=>{
    axios.post(`${process.env.REACT_APP_SERVER_URI}/getjobdetailsprof`,{jobid : id}).then(res =>{
      if(res.data.validid){
        console.log(res.data.info);
        setInfo(res.data.info);
      }else{
        alert('invalid id');
        navigate('/prof')
      }
    }).catch(err => console.log(err));
  },[])

  const offerChangeHandler = (event) =>{
    setOffer({ ...offer, [event.target.name]: event.target.value });
  }

  const offerButtoonClickHandler = (e) =>{
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_SERVER_URI}/postoffer`,{...offer, jobid : id}).then(res =>{
        alert(res.data.msg);
        if(res.data.success)
        {
            navigate('/prof');
        }
    }).catch(err => console.log(err));
  }

  return (
    <div id='job-details-container'>
        <div id='job-details-div'>
            <div id='job-details-title-div'>
                <h3>{info.jobtitle}</h3>
                {
                  info.active ? <div id='close-text'>
                                    Open
                                </div>
                              : <div id='close-text'>
                                  closed
                                </div>
                }
            </div>
            
            <div id='job-details-body-div'>
                <div id='job-details-desc'>
                    <div>
                      <div>
                      {info.jobdesc}
                      </div>
                    </div>
                </div>

                <div className='job-details-div'>
                  <h2>Searching for : {info.jobtype}</h2>
                </div>

                <div className='job-details-div'>
                  Posted on : {info.postdate}
                </div>

                <div className='job-details-div'>
                  Service on : {info.deadline}
                </div>

                <div className='job-details-div'>
                  <div>
                    Address : {info.location}
                  </div>
                </div>

                <div className='job-details-div'>
                  Budget : {info.budget} /-
                </div>

                <div className='job-details-div'>
                  Zip Code : {info.zip}
                </div>

                <div className='job-details-div'>
                  Contact : {info.phone}
                </div>

            </div>
        </div>

        <div id='job-details-notification-div' className='prof-offer-container'>
            <div id='offer-header'>Make an Offer</div>
            <form id='offer-form'>
                <input type='number' placeholder='Cost' name='profcost' value={offer.profcost} onChange={offerChangeHandler}/>
                <textarea placeholder='Any Message..' name='profmsg' value={offer.profmsg} onChange={offerChangeHandler}></textarea>
                <button onClick={offerButtoonClickHandler}>Offer</button>
            </form>
        </div>
    </div>
  );
};

export default ProfJobDetailsPage;