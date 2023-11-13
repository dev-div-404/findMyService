import React from 'react'
import { useNavigate } from 'react-router-dom'

const UserPostedJobs = (props) => { 

  const navigate = new useNavigate();

  const postNewJobHandler = () =>{
      navigate('/postjob');
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
              <div  className='userpage-indivisual-task'>
                job 1
              </div>
              <div className='userpage-indivisual-task'>
                job 2
              </div><div  className='userpage-indivisual-task'>
                job 1
              </div>
              <div className='userpage-indivisual-task'>
                job 2
              </div><div  className='userpage-indivisual-task'>
                job 1
              </div>
              <div className='userpage-indivisual-task'>
                job 2
              </div><div  className='userpage-indivisual-task'>
                job 1
              </div>
              <div className='userpage-indivisual-task'>
                job 2
              </div>

          </div>
        </div>
    </div>
  )
}

export default UserPostedJobs