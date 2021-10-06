import React from 'react';
import style from '../App/App.module.scss';
import Authentication from '../container/Authentication/Authentication';

const Main = () => {
  return (
    <div className={style.main_block}>
      <Authentication />
    </div>
  );
};

export default Main;
