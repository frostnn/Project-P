import style from '../Home/Home.module.scss';
import React from 'react';
import { Context } from '../../Context/Context';
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
  const { userInfo } = React.useContext(Context);
  console.log('userInfo', userInfo);
  return (
    <div className={style.home_block}>
      <h1>Welcome back , {userInfo.name}!</h1>
      <h2>
        Please add the information to your <NavLink to="/login/Profile">profile</NavLink>
      </h2>
    </div>
  );
};

export default Home;
