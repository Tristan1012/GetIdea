import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';

const CardComponent = ({ id, title, description, author }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikeClick = async () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikeCount(dislikeCount - 1);
    }

    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(likeCount + 1);

      try {
        await axios.put(`https://getidea.app/strapi/api/ideas/${id}`, {
          data: {
            attributes: {
              like: likeCount + 1,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDislikeClick = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    }

    if (!isDisliked) {
      setIsDisliked(true);
      setDislikeCount(dislikeCount + 1);

      try {
        await axios.put(`https://getidea.app/strapi/api/ideas/${id}`, {
          data: {
            attributes: {
              dislike: dislikeCount + 1,
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Card style={{ width: '400px', margin: '10px' }}>
      <Card.Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span><b>{title}</b></span>
        <div style={{ display: 'flex' }}>
          <Button variant={isLiked ? 'primary' : 'link'} className="mr-2" onClick={handleLikeClick}>
            <i className="bi bi-heart"></i>
          </Button>
          <Button variant={isDisliked ? 'danger' : 'link'} onClick={handleDislikeClick}>
            <i className="bi bi-hand-thumbs-down"></i>
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <b>Published By:</b> {author}
          <span style={{ marginLeft: '10px' }}>
            <b>ID:</b> {id}
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default CardComponent;
