import React, {useContext} from 'react';
import {AuthContext} from '../Auth/AuthProvider';
import User from '../User/User';
import Login from '../Login/Login';

const Main = () => {
  const [authenticated] = useContext(AuthContext);

  return (
    <div>
      {authenticated ? <User /> : <Login />}
    </div>
  );
}

export default Main;