import React from 'react';
import SignIn from '../components/Auth/signIn';
import SignUp from '../components/Auth/signUp';

const ViewAuth = (props) => {
  const { type } = props;
  return <>{type === 'signup' ? <SignUp /> : <SignIn />}</>;
};
export default ViewAuth;
