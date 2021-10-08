import style from '../AlertPassword/AlertPassword.module.scss';
import { TiWarningOutline } from 'react-icons/ti';
import React from 'react';

const AlertPassword: React.FC = () => {
  return (
    <div className={style.alert_block}>
      <TiWarningOutline />
      <div>Пароли не совпадают</div>
    </div>
  );
};

export default AlertPassword;
