import style from '../Home/Home.module.scss';
import React from 'react';
import { Context } from '../../Context/Context';

const Home: React.FC = () => {
  const { userInfo } = React.useContext(Context);
  console.log('userInfo', userInfo);
  return (
    <div className={style.home_block}>
      <h1>Welcome back , {userInfo.name}!</h1>
    </div>
  );
};

export default Home;
