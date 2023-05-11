import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './petMenu.scss';
import CardItem from './cardItem';

const PetMenu = () => {
  const [listProduct, setListProduct] = useState([]);
  const [type, setType] = useState('cat');
  const getProduct = async (type) => {
    const product = await axios.get(
      `http://localhost:8000/api/product/type/find?type=${type ? type : 'cat'}`,
    );
    type === undefined ? setType('cat') : setType(type);
    setListProduct(product.data);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <Container>
      <div className="menu">
        <div className="form-group">
          <h2>Type</h2>
          <ul>
            <li onClick={() => getProduct('cat')}>Cat</li>
            <li onClick={() => getProduct('dog')}>Dog</li>
          </ul>
        </div>
        <div className="products">
          {listProduct.length > 0 && (
            <>
              <h3>{type}</h3>
              <Row>
                {listProduct.map((item, index) => (
                  <Col key={index}>
                    <CardItem data={item} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
export default PetMenu;
