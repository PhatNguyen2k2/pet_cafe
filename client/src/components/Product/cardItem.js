import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardItem = (props) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{props.price}</Card.Text>
        <Button variant="primary" href="/">
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
