import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserNotification = (props) => { 

  const navigate = new useNavigate();

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    axiosInstance.get(`${process.env.REACT_APP_SERVER_URI}/getusernotification`).then(res =>{
        if(!res.data.success){
          console.log('could not fetch data');
        }else{
            setNotifications(res.data.notifications);
        }
    }).catch(err => console.log(err));
  },[])

  const redirectToJobPage = (jobid) =>{
      navigate(`./jobs/${jobid}`)
  }

  return (
    <div className='user-posted-jobs-main-div'>
        <div className='user-posted-jobs-header'>
            <div className='user-posted-jobs-title-text'>
              Notifications
            </div>
        </div>

        <div id='userpage-joblist-container'>
          <div id='userpage-job-list'>
              {
                notifications.length === 0 ?
                  <div> Nothing to show </div>
                : <div >
                      {
                        notifications.map(Notification =>(
                          <div key={Notification._id} className='user-page-indivisual-job' onClick={() => redirectToJobPage(Notification.link)} >
                              <div className='user-page-indivisual-job1'>
                                    {Notification.text}
                              </div>
                          </div>
                        ))
                      }
                  </div>
              }
          </div>
        </div>
    </div>
  )
}

export default UserNotification