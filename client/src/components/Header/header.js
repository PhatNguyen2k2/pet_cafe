import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { $userIsLoggedIn, $userSelector } from '../../redux/selector';
import { userActions } from '../../redux/slice/userSlice';
import './header.scss';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const [isShowUserInfo, setIsShowUserInfo] = useState(false);
  const user = useSelector($userSelector);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector($userIsLoggedIn);
  const navigate = useNavigate();
  const buttonSearchClickHandler = () => {
    setIsOpenSearchBox(!isOpenSearchBox);
  };
  const logoutHandler = async () => {
    setTimeout(async () => {
      //   await logoutUser();
      navigate('/');
      localStorage.removeItem('accessToken');
      dispatch(userActions.logoutUser());
    }, 1000);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate('/search?q=' + searchInput);
  };
  return (
    <>
      <Navbar id="navbar" bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand id="logo" href="/">
            <img
              id="image"
              src="https://res.cloudinary.com/da5yv096f/image/upload/c_thumb,w_200,g_face/v1660304537/sjurhenspm6bgla0sd9x.png"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/product/drink">Drink</Nav.Link>
              <Nav.Link href="/product/pet">Pet</Nav.Link>
              <Nav.Link href="/aboutUs">About us</Nav.Link>
            </Nav>
            <Nav id="nav">
              <Nav.Link to="/basket">
                <img
                  id="basket"
                  src="https://res.cloudinary.com/da5yv096f/image/upload/v1675176667/icons8-shopping-cart_kro61k.gif"
                  alt="basket"
                />
              </Nav.Link>
              <NavDropdown
                title={
                  <img
                    src={
                      user && user.avatar
                        ? user.avatar
                        : 'https://wordpress.iqonic.design/product/wp/streamit/wp-content/themes/streamit-theme/assets/images/redux/user.png'
                    }
                    alt="user-avatar"
                  />
                }
                id="navbarScrollingDropdown"
              >
                {!isLoggedIn && (
                  <div>
                    <NavDropdown.Item href="/signin">Sign in</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Sign up</NavDropdown.Item>
                  </div>
                )}
                {isLoggedIn && (
                  <div>
                    <NavDropdown.Item href="#action4">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Bill</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Log out
                    </NavDropdown.Item>
                  </div>
                )}
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success" onClick={submitHandler}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
