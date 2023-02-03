import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { Navigate, useParams } from 'react-router-dom';
import './itemDetail.scss';
const ItemDetail = () => {
  const { productId } = useParams();
  const [data, setData] = useState({});
  async function getProduct() {
    const product = await axios.get(
      'http://localhost:8000/api/product/' + productId,
    );
    setData(product.data);
  }
  useEffect(() => {
    getProduct();
  });
  return (
    <Container>
      <Row className="row">
        <Col className="imageCol">
          <img className="image" src={data.image} alt={data.name} />
        </Col>
        <Col>
          <h1>{data.name}</h1>
          <h3>Type: {data.type}</h3>
          <h3>Price: {data.price}</h3>
        </Col>
      </Row>
    </Container>
  );
};
export default ItemDetail;
