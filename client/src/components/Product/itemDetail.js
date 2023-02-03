import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import { useParams } from 'react-router-dom';
import './itemDetail.scss';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { $userIsLoggedIn } from '../../redux/selector';
const ItemDetail = () => {
  const isLoggedIn = useSelector($userIsLoggedIn);
  const { productId } = useParams();
  const [data, setData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  async function getProduct() {
    const product = await axios.get(
      'http://localhost:8000/api/product/' + productId,
    );
    setData(product.data);
  }
  const handleAlert = () => {
    setShowAlert(false);
  };
  async function addCart() {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8000/api/user/addBasket/' + data._id, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  }
  const btnAlert = () => {
    setShowAlert(true);
  };
  useEffect(() => {
    getProduct();
  });
  return (
    <Container>
      {showAlert && !isLoggedIn && (
        <Alert key={'warning'} variant={'warning'} onClick={handleAlert}>
          You need to login first
        </Alert>
      )}
      {showAlert && isLoggedIn && (
        <Alert key={'primary'} variant={'primary'} onClick={handleAlert}>
          Added success
        </Alert>
      )}
      <Row className="row">
        <Col className="imageCol">
          <img className="image" src={data.image} alt={data.name} />
        </Col>
        <Col>
          <h1>{data.name}</h1>
          <h3>Type: {data.type}</h3>
          <h3>Price: {data.price}</h3>
          {isLoggedIn ? (
            <Button variant="primary" onClick={addCart}>
              Add cart
            </Button>
          ) : (
            <Button variant="primary" onClick={btnAlert}>
              Add cart
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};
export default ItemDetail;
