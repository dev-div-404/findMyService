import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProfJobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    withCredentials: true,
  });

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
    useremail : '',
    active : true
  });

  const [offer, setOffer] = useState({
    profcost : '',
    profmsg : 'Accepted'
  });

  const [myoffer, setMyOffer] = useState({
    profcost : '',
    profmsg : 'Accepted'
  });

  const [exist, setExist] = useState(false);
  const [otherOfferStatus, setOtherOfferStatus] = useState(false);
  
  
  useEffect(()=>{
    axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/getjobdetailsprof`,{jobid : id}).then(res =>{
      if(res.data.validid){
        setInfo(res.data.info);
        setOffer({
          ...offer,
          profcost : String(res.data.info.budget),
        })
      }else{
        navigate('/prof')
      }
    }).catch(err => console.log(err));

    axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/getolderoffer`,{jobid : id}).then(res =>{
      if(res.data.exists){
        console.log(res.data.offer)
        setExist(true);
        setMyOffer(res.data.offer);
      }else{
        setExist(false);
        console.log(res.data.otherofferstatus);
        if(res.data.otherofferstatus)
        {
            setOtherOfferStatus(true);
        }
      }
    }).catch(err => console.log(err));
  },[])
  

  const offerChangeHandler = (event) =>{
    setOffer({ ...offer, [event.target.name]: event.target.value });
  }

  const offerButtoonClickHandler = (e) =>{
    e.preventDefault();
    axiosInstance.post(`${process.env.REACT_APP_SERVER_URI}/postoffer`,{...offer, jobid : id,useremail : info.useremail, jobtitle : info.jobtitle}).then(res =>{
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
            {

             !(exist || otherOfferStatus) ? <div>
                                              <div id='offer-header'>Make New Offer</div>
                                              <form id='offer-form'>
                                                  <input type='number' placeholder='Cost' name='profcost' value={offer.profcost} onChange={offerChangeHandler}/>
                                                  <textarea placeholder='Any Message..' name='profmsg' value={offer.profmsg} onChange={offerChangeHandler}></textarea>
                                                  <button onClick={offerButtoonClickHandler}>Offer</button>
                                              </form>
                                            </div>
                    : otherOfferStatus ? <div className='offer-accepted-from-other'>
                                              <div className='offer-from-others'>
                                                  Offer from others has been Accepted
                                              </div>
                                              <div className='sorry-message offer-from-others'>
                                                🫡 SORRY !! 🫡
                                              </div>
                                          </div>
                    
                    : <div className='offer-accepted-dib-container'>
                          <div className='offer-accepted-container'>
                            <div className='offer-accepted-greetings'>
                            🎉 Your offer has been accepted by the client! 🎉
                            </div>
                            <div>
                              Your Price : {myoffer.profcost}
                            </div>
                            <div>
                              :: Your Note ::
                            </div>
                            <div className='offer-accepted-note'>
                                {myoffer.profmsg}
                            </div>
                            <div className='offer-accepted-happy'>
                                Happy Work !!
                            </div>
                          </div>
                      </div>
            }
        </div>
    </div>
  );
};

export default ProfJobDetailsPage;