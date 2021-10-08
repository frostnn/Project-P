import style from '../ButtonBack/ButtonBack.module.scss';
import { FiChevronLeft } from 'react-icons/fi';
import React from 'react';

interface iButtonBack {
  toggleAuth: (index: number | null) => void;
}
const ButtonBack: React.FC<iButtonBack> = ({ toggleAuth }) => {
  return (
    <div className={style.btn_back_wrapper}>
      <button className={style.btn_back} onClick={() => toggleAuth(null)}>
        <FiChevronLeft />
      </button>
    </div>
  );
};

export default ButtonBack;
