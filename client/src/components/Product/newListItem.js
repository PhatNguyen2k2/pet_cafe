import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardItem from './cardItem';
import './newListItem.scss';
import { NavLink } from 'react-router-dom';

const NewListItem = (props) => {
  const [data, setData] = useState([]);
  const [drink, setDrink] = useState(true);
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
    if (props.data[0].type === 'dog' || props.data[0].type === 'cat') {
      setDrink(false);
    }
  }, [props.data]);
  return (
    <>
      <Container>
        {drink ? (
          <h1 style={{ fontFamily: '"Playfair Display", serif' }}>
            Our new drink
          </h1>
        ) : (
          <h1 style={{ fontFamily: '"Playfair Display", serif' }}>
            Our new pet
          </h1>
        )}
        <div className="listProduct">
          <Row>
            {data.map((item, index) => (
              <Col key={index}>
                <CardItem data={item} />
              </Col>
            ))}
          </Row>
          <div className="viewMore">
            {drink ? (
              <NavLink className="link" to="/product/drink/all">
                View More
              </NavLink>
            ) : (
              <NavLink className="link" to="/product/pet/all">
                View More
              </NavLink>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default NewListItem;
