import SingUp from '../../components/SingUp/SingUp';
import SingIn from '../../components/SingIn/SingIn';
import style from '../Authentication/Authentication.module.scss';
import React from 'react';

const Authentication: React.FC = () => {
  const [toggle, setToggle] = React.useState<Number | null>(null);
  const toggleAuth = (index: Number | null): void => {
    setToggle(index);
  };
  return (
    <div className={style.authentication_block}>
      <div className={style.authentication_block_content}>
        {!toggle && (
          <div className={style.authentication_block_content_wrapper}>
            <div className={style.authentication_block_content_title}></div>
            <div className={style.authentication_block_content_btn_wrapper}>
              <button
                className={style.authentication_block_content_btn_singup}
                onClick={() => toggleAuth(1)}>
                Sing up
              </button>
              <button
                className={style.authentication_block_content_btn_loggin}
                onClick={() => toggleAuth(2)}>
                Loggin
              </button>
            </div>
          </div>
        )}
        {toggle === 1 && <SingUp toggleAuth={toggleAuth} />}
        {toggle === 2 && <SingIn toggleAuth={toggleAuth} />}
      </div>
    </div>
  );
};
export default Authentication;
