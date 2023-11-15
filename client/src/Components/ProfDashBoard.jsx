import React from 'react'
import ProfNearByJobs from './ProfNearByJobs';

const ProfDashBoard = (props) => {

  const userEmail = props.email;
  const username = props.userName;

  return (
    <div className='userpage-dashboard-main-div'>
        <div className='dashboard-posted-job-div'>
            <ProfNearByJobs email = {userEmail}/>
        </div>
        <div className='dashboard-notification-div'>
            these are notifications
        </div>
    </div>
  )
}

export default ProfDashBoard