import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cardItem.scss';

const CardItem = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);
  return (
    <Card className="card" style={{ width: '13rem' }}>
      <Card.Img className="image" variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>{data.price}</Card.Text>
        <Button variant="primary" href={'/product/' + data._id}>
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
