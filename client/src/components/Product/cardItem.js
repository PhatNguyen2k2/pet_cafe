import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './cardItem.scss';

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
        <Button variant="primary" href="/">
          Detail
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardItem;
{
  /* <Card style={{ width: '13rem' }}>
            <Card.Img variant="top" src={data.image} />
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Text>{data.price}</Card.Text>
              <Button variant="primary" href="/">
                Detail
              </Button>
            </Card.Body>
          </Card> */
}
