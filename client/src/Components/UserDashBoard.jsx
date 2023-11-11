import React from 'react'
import UserPostedJobs from './UserPostedJobs'

const UserDashBoard = (props) => {

  const userEmail = props.email;

  return (
    <div className='userpage-dashboard-main-div'>
        <div className='dashboard-posted-job-div'>
            <UserPostedJobs email = {userEmail}/>
        </div>
        <div className='dashboard-notification-div'>
            these are notifications
        </div>
    </div>
  )
}

export default UserDashBoard