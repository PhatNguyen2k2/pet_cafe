import React from 'react';
import CardItem from './cardItem';

const NewListItem = (props) => {
  return (
    <>
      <Row xs={1} md={5} className="g-4">
        {props.map((item) => {
          <CardItem {...item} />;
        })}
      </Row>
    </>
  );
};
export default NewListItem;
