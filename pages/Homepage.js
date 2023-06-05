import React, { useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import OffcanvasForm from '../components/OffcanvasForm';
import CardContainer from '../components/CardContainer';
import { Modal, Button } from 'react-bootstrap';

const Homepage = ({ handleRefreshIdeas, refreshKey }) => {
  const currentYear = new Date().getFullYear();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [publisherName, setPublisherName] = useState('');

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        data: {
          attributes: {
            Title: ideaTitle,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: new Date().toISOString(),
            Description: ideaDescription,
            Author: publisherName,
            Likes: null,
            Dislikes: null,
          },
        },
        meta: {},
      };

      // Make the POST request to the API
      // You can handle the response or any error handling logic here
      console.log('Form submitted:', ideaTitle, ideaDescription, publisherName);
      handleCloseOffcanvas();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SiteHeader handleShowOffcanvas={handleShowOffcanvas} handleRefreshIdeas={handleRefreshIdeas} />
      <CardContainer refreshKey={refreshKey} />

      <footer style={{ background: '#0e153a', color: 'white', padding: '10px', textAlign: 'center', height: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p>&copy; {currentYear} Tristan Jones, All Rights Reserved</p>
        <a href="#contact" style={{ color: 'white', cursor: 'pointer' }} onClick={handleShowModal}>Report an Issue</a>
      </footer>

      <OffcanvasForm
        show={showOffcanvas}
        handleClose={handleCloseOffcanvas}
        handleFormSubmit={handleFormSubmit}
        ideaTitle={ideaTitle}
        setIdeaTitle={setIdeaTitle}
        ideaDescription={ideaDescription}
        setIdeaDescription={setIdeaDescription}
        publisherName={publisherName}
        setPublisherName={setPublisherName}
      />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Report an Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You can forward any issues using this service to <a href="mailto:tristanjones247+idea_issue@gmail.com">tristanjones247+idea_issue@gmail.com</a>.</p>
          <p>This is a free service and support is limited.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Homepage;
