import style from '../AlertPassword/AlertPassword.module.scss';
import { TiWarningOutline } from 'react-icons/ti';
import React from 'react';
interface ITextAlert {
  textAlert: string;
}
const AlertPassword: React.FC<ITextAlert> = ({ textAlert = 'Ошибка!' }: ITextAlert) => {
  return (
    <div className={style.alert_block}>
      <TiWarningOutline />
      <div>{textAlert}</div>
    </div>
  );
};

export default AlertPassword;
