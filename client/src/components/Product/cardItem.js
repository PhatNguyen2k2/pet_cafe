import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './cardItem.scss';

const CardItem = (props) => {
  const navigate = useNavigate();
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
        <Card.Text>{data.price} VND</Card.Text>
        <Button
          variant="primary"
          onClick={() => navigate('/product/' + data._id)}
        >
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
