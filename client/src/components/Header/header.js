import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
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
  useEffect(() => {
    getProduct();
  }, [listProduct]);
  return (
    <Navbar id="navbar" bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand id="logo" href="/">
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
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="navlink" href="/">
                Home
              </Nav.Link>
              <Nav.Link className="navlink" href="/product/drink/all">
                Drink
              </Nav.Link>
              <Nav.Link className="navlink" href="/product/pet/all">
                Pet
              </Nav.Link>
              <Nav.Link className="navlink" href="/aboutUs">
                About us
              </Nav.Link>
            </Nav>
            <Nav id="nav">
              <Nav.Link to="/cart">
                <div className="cart">
                  <img
                    className="image"
                    src="https://res.cloudinary.com/da5yv096f/image/upload/v1675176667/icons8-shopping-cart_kro61k.gif"
                    alt="cart"
                  />
                  {numberProduct > 0 && <p id="numProduct">{numberProduct}</p>}
                </div>
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
                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="/bill">Bill</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Log out
                    </NavDropdown.Item>
                  </div>
                ) : (
                  <div>
                    <NavDropdown.Item href="/signin">Sign in</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                  </div>
                )}
              </NavDropdown>
            </Nav>
            {listProduct.length > 0 && (
              <div style={{ width: 350, zIndex: 3 }}>
                <ReactSearchAutocomplete
                  items={listProduct}
                  formatResult={formatResult}
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
