import style from '../Response/Response.module.scss';
import { TiWarningOutline } from 'react-icons/ti';
import { FaUserCheck } from 'react-icons/fa';
import React from 'react';
import { iResponse } from '../../fetch/fetch';
import classNames from 'classnames';

const Response: React.FC<iResponse | null> = ({ status, message }) => {
  return (
    <div
      className={classNames(
        style.response_block,
        status === 'error' ? style.alert : style.success,
      )}>
      {status === 'error' ? <TiWarningOutline /> : <FaUserCheck />}
      <div>{message}</div>
    </div>
  );
};

export default Response;
