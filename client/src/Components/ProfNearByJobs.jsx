import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const ProfNearByJobs = (props) => { 

  const navigate = new useNavigate();

  const axiosInstance = axios.create({
    withCredentials: true,
  });

  const [jobs, setJobs] = useState([]);

  useEffect(()=>{
    axiosInstance.get(`${process.env.REACT_APP_SERVER_URI}/getnearbyjobs`).then(res =>{
        if(!res.data.success){
          console.log('could not fetch data');
        }else{
          setJobs(res.data.jobs);
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
              These are Near by jobs
            </div>
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

export default ProfNearByJobs