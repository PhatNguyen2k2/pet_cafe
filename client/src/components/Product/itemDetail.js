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
import CardItem from './cardItem';
const ItemDetail = () => {
  const isLoggedIn = useSelector($userIsLoggedIn);
  const { productId } = useParams();
  const [data, setData] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  async function getProduct() {
    const product = await axios.get(
      `http://localhost:8000/api/product/${productId}`,
    );
    setData(product.data);
    const products = await axios.get(
      'http://localhost:8000/api/product/type/find?type=' + data.type,
    );
    setListProduct(products.data);
  }
  const handleAlert = () => {
    setShowAlert(false);
  };
  async function addCart() {
    setShowAlert(true);
    const token = localStorage.getItem('token');
    await axios.post(
      'http://localhost:8000/api/user/addBasket/' + data._id,
      { num: 1 },
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ num: 1 }),
      },
    );
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
        <Alert key={'warning'} variant={'warning'}>
          You need to login first{' '}
          <Alert.Link href="/signin">Sign in</Alert.Link>
        </Alert>
      )}
      {showAlert && isLoggedIn && (
        <Alert key={'primary'} variant={'primary'} onClick={handleAlert}>
          Added success (click to close this alert)
        </Alert>
      )}
      {Object.keys(data).length !== 0 && (
        <div className="item">
          <div className="item-image">
            <img className="image" src={data.image} alt={data.name} />
          </div>
          <div className="item-info">
            <h1>{data.name.toUpperCase()}</h1>
            <h3>Type: {data.type}</h3>
            <h3>Price: {data.price} VND</h3>
            <input type="number" min="1" max={data.amount} defaultValue="1" />
            {isLoggedIn ? (
              <Button variant="primary" onClick={addCart}>
                Add cart
              </Button>
            ) : (
              <Button variant="primary" onClick={btnAlert}>
                Add cart
              </Button>
            )}
          </div>
        </div>
      )}
      {listProduct.length > 0 && (
        <>
          <h2>May be you like</h2>
          <Row>
            {listProduct.map((item, index) => (
              <Col key={index}>
                <CardItem data={item} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
};
export default ItemDetail;
