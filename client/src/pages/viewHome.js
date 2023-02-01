import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner/banner';
import Header from '../components/Header/header';
import NewListItem from '../components/Product/newListItem';

const ViewHome = () => {
  const [drinkdata, setDrinkdata] = useState(null);
  const [petdata, setPetdata] = useState(null);
  async function getData() {
    const res1 = await axios.get('http://localhost:8000/api/product/drink/new');
    setDrinkdata(res1.data);
    const res2 = await axios.get('http://localhost:8000/api/product/pet/new');
    setPetdata(res2.data);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
      <Banner />
      <h2>Our new drink</h2>
      <NewListItem data={drinkdata} />
      <h2>Our new pet</h2>
      <NewListItem data={petdata} />
    </>
  );
};
export default ViewHome;
