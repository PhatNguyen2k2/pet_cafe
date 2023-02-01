import React from 'react';
import SignIn from '../components/Auth/signIn';
import SignUp from '../components/Auth/signUp';
import Header from '../components/Header/header';

const ViewAuth = (props) => {
  const { type } = props;
  return (
    <>
      <Header />
      {type === 'signup' ? <SignUp /> : <SignIn />}
    </>
  );
};
export default ViewAuth;
