import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Homepage from './pages/Homepage';
import './index.css';

const App = () => {

  const handleRefreshIdeas = () => {
    window.location.reload();
  };

  const isMobile = useMediaQuery({ maxWidth: 767 }); // Adjust the breakpoint as needed

  if (isMobile) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>Sorry, Mobile is not yet supported.</h1>
      </div>
    );
  }

  return (
    <div className="App">
      <Homepage handleRefreshIdeas={handleRefreshIdeas}  />
    </div>
  );
};

export default App;
