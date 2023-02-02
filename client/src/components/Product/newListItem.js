import React, { useEffect, useState } from 'react';
import CardItem from './cardItem';
import './newListItem.scss';

const NewListItem = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.data) {
      setData(props.data);
    }
  }, [props.data]);
  return (
    <>
      <div className="listProduct">
        {data.map((item) => (
          <CardItem data={item} />
        ))}
      </div>
    </>
  );
};
export default NewListItem;
