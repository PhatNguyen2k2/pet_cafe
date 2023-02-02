import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import './banner.scss';

const Banner = () => {
  return (
    <Container>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100 imgStyle"
            src="https://res.cloudinary.com/da5yv096f/image/upload/v1675221244/white-cat-4424507_960_720_fsszho.jpg"
            alt="white cat"
          />
          <Carousel.Caption>
            <h3>A cute white cat</h3>
            <p>How cute is it ? _^..^_</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 imgStyle"
            src="https://res.cloudinary.com/da5yv096f/image/upload/v1675221162/animals-3714805_960_720_mjvkaa.jpg"
            alt="british shorthair cat"
          />
          <Carousel.Caption>
            <h3>A British shorthair cat</h3>
            <p>famous British cat in Viet Nam</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 imgStyle"
            src="https://res.cloudinary.com/da5yv096f/image/upload/v1675242771/shiba-inu-7226742_960_720_raob33.jpg"
            alt="shiba inu"
          />
          <Carousel.Caption>
            <h3>A shiba inu</h3>
            <p>You should pet him once ^^</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 imgStyle"
            src="https://res.cloudinary.com/da5yv096f/image/upload/v1675221427/corgi-6705821_960_720_xqkcd0.jpg"
            alt="corgi"
          />
          <Carousel.Caption>
            <h3>A corgi</h3>
            <p>You will surprise about his friendly</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 imgStyle"
            src="https://res.cloudinary.com/da5yv096f/image/upload/v1675221496/coffee-2179028_960_720_oshp8c.jpg"
            alt="coffee"
          />
          <Carousel.Caption>
            <h3>A coffee</h3>
            <p>And our beauty coffee for your social image</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default Banner;
