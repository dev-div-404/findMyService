import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const [offers, setOffers] = useState([]);

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

  useEffect(()=>{
    axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/getjobdetails`,{jobid : id}).then(res =>{
      if(res.data.validid){
        setInfo(res.data.info);
      }else{
        navigate('/user')
      }
    }).catch(err => console.log(err));


    axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/getoffer`,{jobid : id}).then(res =>{
      if(res.data.validid){
        setOffers(res.data.offers);
      }else{
        navigate('/user')
      }
    }).catch(err => console.log(err));

  },[])

  const closeJobHandler = () =>{
      axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/closeJob`,{jobid : id}).then(res=>{
          if(res.data.status){
            navigate('/user');
          }
      }).catch(err => console.log(err));
  }

  return (
    <div id='job-details-container'>
        <div id='job-details-div'>
            <div id='job-details-title-div'>
                <h3>{info.jobtitle}</h3>
                {
                  info.active ? <button onClick={closeJobHandler}>
                                  close
                                </button>
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

        <div id='job-details-notification-div'>
            <div id='offers-title'>offers</div>
            <div id='userpage-joblist-container'>
              <div id='userpage-job-list'>
                  {
                    offers.length === 0 ?
                      <div> Nothing to show </div>
                    : <div >
                          {
                            offers.map(offer =>(
                              <div key={offer._id} >
                                  
                              </div>
                            ))
                          }
                      </div>
                  }
              </div>
          </div>
        </div>
    </div>
  );
};

export default JobDetailsPage;