import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserPostedJobs = (props) => { 

  const navigate = new useNavigate();

  axios.useCredentials = true;

  const [jobs, setJobs] = useState([]);

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_SERVER_URI}/getuserjob`).then(res =>{
        if(!res.data.success){
          alert('could not fetch data');
        }else{
          setJobs(res.data.jobs);
        }
    }).catch(err => console.log(err));
  },[])

  const postNewJobHandler = () =>{
      navigate('/postjob');
  }

  const redirectToJobPage = (jobid) =>{
      navigate(`./jobs/${jobid}`)
  }

  return (
    <div className='user-posted-jobs-main-div'>
        <div className='user-posted-jobs-header'>
            <div className='user-posted-jobs-title-text'>
              These are posted jobs
            </div>
            <button onClick={postNewJobHandler} id='add-job-btn-01'>
              Post New Job
            </button>
        </div>

        <div id='userpage-joblist-container'>
          <div id='userpage-job-list'>
              {
                jobs.length === 0 ?
                  <div> Nothing to show </div>
                : <div >
                      {
                        jobs.map(job =>(
                          <div key={job._id} className='user-page-indivisual-job' onClick={() => redirectToJobPage(job._id)} >
                              <div className='indivisual-job-inside-div'>
                                 <div className='job-title'>
                                    {job.jobtitle}
                                 </div>
                                 <div className='job-date'>
                                    {job.postdate}  
                                 </div>
                                 <div className='job-status'>
                                  {
                                    job.active === true ? '⌛' : '✅'
                                  }
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
  )
}

export default UserPostedJobs