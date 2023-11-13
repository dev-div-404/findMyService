// src/components/PostJobForm.js
import React, { useState } from 'react';
import './PostJobForm.css'; // Import the CSS file

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    jobTitle: '',
    jobDescription: '',
    location: '',
    mediaUpload: null,
    budget: '',
    deadline: '',
    communicationMethod: '',
    additionalPreferences: '',
    privacySettings: false,
    termsAndConditions: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add code to send formData to your backend for processing
    console.log('Form Data:', formData);
    // Reset the form after submission if needed
    // setFormData({ ...initialFormData });
  };

  return (
    <div id="postJobContainer">
      <h2>Post Job</h2>
      <form id="postJobForm" onSubmit={handleSubmit}>
        <label className="postJobLabel" htmlFor="serviceType">
          Service Type:
        </label>
        <select
          id="serviceType"
          className="postJobInput"
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          required
        >
          <option value="plumbing">Plumbing</option>
          <option value="carpentry">Carpentry</option>
          {/* Add more options as needed */}
        </select>

        <label className="postJobLabel" htmlFor="jobTitle">
          Job Title:
        </label>
        <input
          type="text"
          id="jobTitle"
          className="postJobInput"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          required
        />

        <label className="postJobLabel" htmlFor="jobDescription">
          Job Description:
        </label>
        <textarea
          id="jobDescription"
          className="postJobInput"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <label className="postJobLabel" htmlFor="location">
          Location:
        </label>
        <input
          type="text"
          id="location"
          className="postJobInput"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label className="postJobLabel" htmlFor="mediaUpload">
          Media Upload:
        </label>
        <input
          type="file"
          id="mediaUpload"
          className="postJobInput"
          name="mediaUpload"
          accept="image/*, video/*"
          onChange={handleChange}
        />

        <label className="postJobLabel" htmlFor="budget">
          Budget Range:
        </label>
        <input
          type="text"
          id="budget"
          className="postJobInput"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          placeholder="Enter your budget"
        />

        <label className="postJobLabel" htmlFor="deadline">
          Timeline/Deadline:
        </label>
        <input
          type="date"
          id="deadline"
          className="postJobInput"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
        />

        <label className="postJobLabel" htmlFor="communicationMethod">
          Preferred Communication Method:
        </label>
        <select
          id="communicationMethod"
          className="postJobInput"
          name="communicationMethod"
          value={formData.communicationMethod}
          onChange={handleChange}
        >
          <option value="platform">Through Platform</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>

        <label className="postJobLabel" htmlFor="additionalPreferences">
          Additional Preferences:
        </label>
        <textarea
          id="additionalPreferences"
          className="postJobInput"
          name="additionalPreferences"
          value={formData.additionalPreferences}
          onChange={handleChange}
          rows="3"
        ></textarea>

        <label className="postJobLabel" htmlFor="privacySettings">
          Privacy Settings:
        </label>
        <input
          type="checkbox"
          id="privacySettings"
          className="postJobInput"
          name="privacySettings"
          checked={formData.privacySettings}
          onChange={handleChange}
        />
        Make Public

        <label className="postJobLabel" htmlFor="termsAndConditions">
          Terms and Conditions:
        </label>
        <input
          type="checkbox"
          id="termsAndConditions"
          className="postJobInput"
          name="termsAndConditions"
          checked={formData.termsAndConditions}
          onChange={handleChange}
          required
        />
        I agree to the terms and conditions

        <button id="postJobSubmitBtn" type="submit">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJobForm;
