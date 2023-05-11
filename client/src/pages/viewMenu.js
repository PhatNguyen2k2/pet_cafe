import React from 'react';
import Header from '../components/Header/header';
import DrinkMenu from '../components/Product/drinkMenu';
import PetMenu from '../components/Product/petMenu';

const ViewMenu = (props) => {
  const { type } = props;
  return (
    <>
      <Header />
      {type === 'drink' ? <DrinkMenu /> : <PetMenu />}
    </>
  );
};
export default ViewMenu;
