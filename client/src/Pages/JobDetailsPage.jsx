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

  const [acceptedOffer, setAcceptedOffer] = useState({})
  const [accepted, setAccepted] = useState(false);

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
        if(res.data.acceptedOffer){
            setAcceptedOffer(res.data.acceptedOffer);
            setAccepted(true);
        }
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

  const acceptOfferHandler = (offerid) =>{
    axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/acceptoffer`,{offerid : offerid}).then(res =>{
      window.location.reload();
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

                      : accepted ?
                            <div>
                              <div key={acceptedOffer._id} className='offer-div-container'>
                                  <div className='offer-div-title-bar'>
                                      <div className='offer-profname'>
                                          From : {acceptedOffer.profname}
                                      </div>
                                      <div className='offer-profprice'>
                                          Offer : {acceptedOffer.profcost}
                                      </div>
                                      <div className='offer-button-container'>
                                          
                                      </div>
                                  </div>
                                  <div className='offer-body'>
                                      <div className='offer-prof-phone'>
                                          contact : 1234567890
                                      </div>
                                      <div className='offer-prof-msg'>
                                          Note : {acceptedOffer.profmsg}
                                      </div>
                                  </div>
                                </div>
                            </div>
                      :<div >
                            {
                              offers.map(offer =>(
                                <div key={offer._id} className='offer-div-container'>
                                    <div className='offer-div-title-bar'>
                                        <div className='offer-profname'>
                                            From : {offer.profname}
                                        </div>
                                        <div className='offer-profprice'>
                                            Offer : {offer.profcost}
                                        </div>
                                        <div className='offer-button-container'>
                                            <button className='offer-accept-btn' onClick={() => acceptOfferHandler(offer._id)}>
                                               Accept
                                            </button>
                                        </div>
                                    </div>
                                    <div className='offer-body'>
                                        <div className='offer-prof-phone'>
                                            contact : 1234567890
                                        </div>
                                        <div className='offer-prof-msg'>
                                            Note : {offer.profmsg}
                                        </div>
                                    </div>
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