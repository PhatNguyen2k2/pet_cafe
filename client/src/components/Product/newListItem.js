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
        {drink ? <h1>Our new drink</h1> : <h1>Our new pet</h1>}
        <div className="listProduct">
          <Row>
            {data.map((item) => (
              <Col>
                <CardItem data={item} key={item._id} />
              </Col>
            ))}
          </Row>
          <div className="viewMore">
            {drink ? (
              <NavLink to="/product/drink">View More</NavLink>
            ) : (
              <NavLink to="/product/pet">View More</NavLink>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default NewListItem;
