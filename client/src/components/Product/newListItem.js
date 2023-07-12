import React, { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import CardItem from './cardItem';
import './newListItem.scss';
import { NavLink } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NewListItem = (props) => {
  const [data, setData] = useState([]);
  const [drink, setDrink] = useState(true);
  const sliderRef = useRef(null);
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
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
        {drink ? (
          <h1 style={{ fontFamily: '"Playfair Display", serif' }}>
            Our new drink
          </h1>
        ) : (
          <h1 style={{ fontFamily: '"Playfair Display", serif' }}>
            Our new pet
          </h1>
        )}
        <div className="listProduct">
          <Slider {...settings} ref={sliderRef}>
            {data.map((item, index) => (
              <CardItem key={index} data={item} />
            ))}
          </Slider>
          <div className="viewMore">
            {drink ? (
              <NavLink className="link" to="/product/drink/all">
                View More
              </NavLink>
            ) : (
              <NavLink className="link" to="/product/pet/all">
                View More
              </NavLink>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
export default NewListItem;
