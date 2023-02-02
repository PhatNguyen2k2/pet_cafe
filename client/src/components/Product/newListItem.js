import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardItem from './cardItem';
import './newListItem.scss';

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
  console.log(data);
  return (
    <>
      <Container>
        {drink && <h1>Our new drink</h1>}
        {!drink && <h1>Our new pet</h1>}
        <div className="listProduct">
          <Row>
            {data.map((item) => (
              <Col>
                <CardItem data={item} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};
export default NewListItem;
