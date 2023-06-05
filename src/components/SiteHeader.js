import React from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { ReactComponent as Logo } from '../assets/logo.svg';

const SiteHeader = ({ handleRefreshIdeas, handleShowOffcanvas }) => {
  return (
    <Navbar bg="light" variant="light" className="header" style={{ height: '10vh', display: 'flex', alignItems: 'center' }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo className="logo" style={{ width: '50px', height: '50px', fill: 'blue' }} />
          <span className="brand-name">GetIdea.app</span>
        </div>
        <div>
          <Button style={{ marginRight: '15px' }} className="create-idea-btn" variant="primary" onClick={handleShowOffcanvas}>
            Create an Idea
          </Button>
          <Button className="refresh-ideas-btn" variant="dark" onClick={handleRefreshIdeas}>
            <i className="bi bi-arrow-clockwise"></i>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default SiteHeader;
