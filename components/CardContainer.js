import React, { useEffect, useState, useCallback } from 'react';
import CardComponent from './CardComponent';
import axios from 'axios';

const CardContainer = () => {
  const [cards, setCards] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get('https://getidea.app/strapi/api/ideas/?pagination[page]=1&pagination[pageSize]=1');
      const totalIdeas = response.data.meta.pagination.total;
      const randomNumbers = generateRandomNumbers(totalIdeas, 3);
      const ideas = await Promise.all(randomNumbers.map(async (number) => {
        const ideaResponse = await axios.get(`https://getidea.app/strapi/api/ideas/${number}`);
        return ideaResponse.data.data;
      }));
      setCards(ideas);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const generateRandomNumbers = (max, count) => {
    const randomNumbers = new Set();
    while (randomNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * max) + 1;
      randomNumbers.add(randomNumber);
    }
    return Array.from(randomNumbers);
  };


  return (
    <div
      className="main-container"
      style={{
        overflowX: 'auto', // Enable horizontal scrolling
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px', // Add some padding for better spacing
        background:
          'linear-gradient(135deg, #000dff55 25%, transparent 25%) -24px 0/ 48px 48px, linear-gradient(225deg, #000dff 25%, transparent 25%) -24px 0/ 48px 48px, linear-gradient(315deg, #000dff55 25%, transparent 25%) 0px 0/ 48px 48px, linear-gradient(45deg, #000dff 25%, #e5e5f7 25%) 0px 0/ 48px 48px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '10px', // Add gap between cards for spacing
          padding: '10px', // Add padding on mobile to show some background
          maxWidth: 'fit-content', // Allow container to wrap around the cards
          boxSizing: 'border-box', // Include padding within the width calculation
          alignItems: 'flex-start', // Align cards at the top of the container
        }}
      >
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            id={card.id}
            title={card.attributes.Title}
            description={card.attributes.Description}
            author={card.attributes.Author}
            style={{
              flex: '0 0 auto', // Ensure cards don't grow or shrink
              minWidth: '400px', // Set a minimum width for each card
              scrollSnapAlign: 'center', // Snap cards to the center of the container
              scrollSnapStop: 'always', // Ensure scrolling stops at each card
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
