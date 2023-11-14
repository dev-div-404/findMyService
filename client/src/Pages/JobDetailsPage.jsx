import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Job Details</h2>
      <p>Job ID: {id}</p>
      {/* Other job details */}
    </div>
  );
};

export default JobDetailsPage;