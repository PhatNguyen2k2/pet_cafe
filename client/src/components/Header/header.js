import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import {
  $userIsLoggedIn,
  $userSelector,
  $productSelector,
} from '../../redux/selector';
import { userActions } from '../../redux/slice/userSlice';
import './header.scss';

const Header = () => {
  const [listProduct, setListProduct] = useState([]);
  const [numberProduct, setNumberProduct] = useState(1);
  const user = useSelector($userSelector);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector($userIsLoggedIn);
  const navigate = useNavigate();
  const logoutHandler = async () => {
    setTimeout(async () => {
      //   await logoutUser();
      navigate('/');
      localStorage.removeItem('accessToken');
      dispatch(userActions.logoutUser());
    }, 1000);
  };
  const getProduct = async () => {
    const product = await axios.get(
      'http://localhost:8000/api/product/type/find?name= ',
    );
    setListProduct(product.data);
  };
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>
          <img src={item.image} style={{ width: '40px', height: '40px' }} />{' '}
          {item.name}
        </span>
      </>
    );
  };
  const handleOnSelect = (item) => {
    navigate('/product/' + item._id);
  };
  useEffect(() => {
    getProduct();
  }, [listProduct]);
  return (
    <Navbar bg="light" expand="lg" className="header">
      <Container fluid>
        <Navbar.Brand id="logo" onClick={() => navigate('/')}>
          <img
            id="image"
            src="https://res.cloudinary.com/da5yv096f/image/upload/v1676201571/petcafeLogo_yz4ltv.png"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'lg'}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${'lg'}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${'lg'}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'lg'}`}>
              Pet Cafe
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav
              className="flex-grow-1 pe-3"
              style={{
                maxHeight: '400px',
                fontSize: 'larger',
                fontWeight: 'bold',
              }}
            >
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/product/drink/all')}>
                Drink
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/product/pet/all')}>
                Pet
              </Nav.Link>
              <Nav.Link onClick={() => navigate('/aboutUs')}>About us</Nav.Link>
            </Nav>
            <Nav
              className="justify-content-end flex-grow-1 pe-3"
              style={{ maxHeight: '300px' }}
            >
              <Nav.Link
                style={{ display: 'flex' }}
                onClick={() => navigate('/cart')}
              >
                <img
                  className="image"
                  style={{ width: '40px', height: '40px' }}
                  src="https://res.cloudinary.com/da5yv096f/image/upload/v1675176667/icons8-shopping-cart_kro61k.gif"
                  alt="cart"
                />
                {numberProduct > 0 && (
                  <p
                    style={{
                      color: 'white',
                      backgroundColor: 'red',
                      borderRadius: '30px',
                      fontSize: '15px',
                    }}
                    id="numProduct"
                  >
                    {numberProduct}
                  </p>
                )}
              </Nav.Link>
              <NavDropdown
                title={
                  <img
                    style={{ width: '40px', height: '40px' }}
                    src={
                      isLoggedIn
                        ? user.avatar
                        : 'https://wordpress.iqonic.design/product/wp/streamit/wp-content/themes/streamit-theme/assets/images/redux/user.png'
                    }
                    alt="user-avatar"
                  />
                }
              >
                {isLoggedIn ? (
                  <div>
                    <NavDropdown.Item onClick={() => navigate('/profile')}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('/bill')}>
                      Bill
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Log out
                    </NavDropdown.Item>
                  </div>
                ) : (
                  <div>
                    <NavDropdown.Item onClick={() => navigate('/signin')}>
                      Sign in
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('/signup')}>
                      Sign up
                    </NavDropdown.Item>
                  </div>
                )}
              </NavDropdown>
            </Nav>
            {listProduct.length > 0 && (
              <div style={{ width: 350, zIndex: 3 }}>
                <ReactSearchAutocomplete
                  items={listProduct}
                  formatResult={formatResult}
                  onSelect={handleOnSelect}
                />
              </div>
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
