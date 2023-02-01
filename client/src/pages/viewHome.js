import axios from 'axios';
import React from 'react';
import Banner from '../components/Banner/banner';
import Header from '../components/Header/header';
import NewListItem from '../components/Product/newListItem';

const ViewHome = async () => {
  const { drinkdata } = await axios.get(
    'http://localhost:8000/api/product/drink/new',
  );
  const { petdata } = await axios.get(
    'http://localhost:8000/api/product/pet/new',
  );
  return (
    <>
      <Header />
      <Banner />
      <h2>Our new drink</h2>
      <NewListItem {...drinkdata} />
      <h2>Our new pet</h2>
      <NewListItem {...petdata} />
    </>
  );
};
export default ViewHome;
