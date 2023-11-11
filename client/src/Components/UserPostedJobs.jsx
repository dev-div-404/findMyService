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
            <button onClick={postNewJobHandler}>
              Post New Job
            </button>
        </div>

        <div>
          posted job lists
        </div>
    </div>
  )
}

export default UserPostedJobs