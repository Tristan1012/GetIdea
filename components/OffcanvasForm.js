import React, { useState } from 'react';

const OffcanvasForm = ({ show, handleClose }) => {
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [publisherName, setPublisherName] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const ideaData = {
      data: {
        Title: ideaTitle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        Description: ideaDescription,
        Author: publisherName,
        Likes: 0,
        Dislikes: 0,
      },
    };

    try {
      const response = await fetch('https://getidea.app/strapi/api/ideas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ideaData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Reset form values
        setIdeaTitle('');
        setIdeaDescription('');
        setPublisherName('');
      } else {
        console.log('API Error:', response.status);
      }
    } catch (error) {
      console.error('API Error:', error);
    }
        handleClose();
  };

  return (
<div
      className={`offcanvas ${show ? 'show' : ''}`}
      style={{
        transform: show ? 'translateX(0)' : 'translateX(100%)', // Slide in from right or slide out to right
        height: '100vh', // Set the height to 100vh
        width: '20vw',
        transition: 'transform 0.3s ease-in-out', // Add smooth transition for sliding animation
        position: 'fixed', // Position the offcanvas fixed on the screen
        top: 0,
        right: 0,
        zIndex: 1050, // Ensure the offcanvas appears above other elements
        overflowY: 'auto', // Enable vertical scrolling if content overflows
        boxShadow: 'rgba(0, 0, 0, 0.3) 0px 0px 10px', // Add a shadow for visual effect
      }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Submit New Idea</h5>
        <button type="button" className="btn-close text-reset" onClick={handleClose}></button>
      </div>
      <div className="offcanvas-body">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="ideaTitle" className="form-label">
              Title of Idea
            </label>
            <input
              type="text"
              className="form-control"
              id="ideaTitle"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ideaDescription" className="form-label">
              Idea Description
            </label>
            <textarea
              className="form-control"
              id="ideaDescription"
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="publisherName" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className="form-control"
              id="publisherName"
              value={publisherName}
              onChange={(e) => setPublisherName(e.target.value)}
              required
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OffcanvasForm;