import style from '../SingIn/SingIn.module.scss';
import { AiOutlineMail, AiOutlineEye, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import React from 'react';
import ButtonBack from '../ButtonBack/ButtonBack';
import classNames from 'classnames';
import Loading from '../../assets/img/loading.svg';
import { authUser, iAuthUserData } from '../../fetch/fetch';
import { Context } from '../../Context/Context';
import AlertPassword from '../AlertPassword/AlertPassword';
import socket from '../../socket/socket';

interface iInput {
  type: string;
  placeholder: string;
  icon: React.FunctionComponentElement<any>;
  eyes?: React.FunctionComponentElement<any>;
}

interface iSingIn {
  toggleAuth: (index: number | null) => void;
}
const SingIn: React.FC<iSingIn> = ({ toggleAuth }) => {
  const [toggleCheckbox, setToggleCheckbox] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [userAuth, setUserAuth] = React.useState<iAuthUserData>({
    email: '',
    password: '',
  });
  const { setLogged, setUserInfo } = React.useContext(Context);
  const clickCheckbox = () => (toggleCheckbox ? setToggleCheckbox(false) : setToggleCheckbox(true));
  const visibilityPassword = (index: number) => {
    const input = document.querySelectorAll<HTMLInputElement>(
      '.SingIn_singIn_block_content_input__24oUm',
    );
    input[index].setAttribute('type', 'text');
  };
  const hidePassword = (index: number) => {
    const input = document.querySelectorAll<HTMLInputElement>(
      '.SingIn_singIn_block_content_input__24oUm',
    );
    input[index].setAttribute('type', 'password');
  };
  const datainput: iInput[] = [
    {
      type: 'email',
      placeholder: 'Email',
      icon: <AiOutlineMail className={style.input_icon} />,
    },
    {
      type: 'password',
      placeholder: 'Password',
      icon: <RiLockPasswordLine className={style.input_icon} />,
      eyes: <AiOutlineEye />,
    },
  ];
  const checkDisabledBtn = !userAuth.password || !userAuth.email ? true : false;
  const getUserData = (
    e: React.ChangeEvent<HTMLInputElement>,
    placeholder: string,
    type: string,
  ) => {
    if (placeholder === 'Password' && type === 'password') {
      setUserAuth({ ...userAuth, password: e.target.value });
    } else if (placeholder === 'Email' && type === 'email') {
      setUserAuth({ ...userAuth, email: e.target.value });
    }
  };

  const addValueInput = (placeholder: string, type: string) => {
    if (placeholder === 'Email' && type === 'email') {
      return userAuth.email;
    } else if (placeholder === 'Password' && type === 'password') {
      return userAuth.password;
    }
  };

  const addUserAuth = async (data: iAuthUserData) => {
    setLoading(true);
    try {
      const user = await authUser(data);
      if (typeof user !== 'string' && Object.keys(user).length) {
        setLogged(true);
        setUserInfo(user);
        socket.emit('ROOM:JOIN', user.id);
      } else if (typeof user === 'string') {
        setError(user);
      }
    } catch (error: any) {
      console.log(`Could not fetch - ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className={style.singIn_block}>
      <ButtonBack toggleAuth={toggleAuth} />
      <div className={style.singIn_block_title}>
        <div className={style.singIn_block_maintitle}>Welcome back</div>
        <div className={style.singIn_block_subtitle}>Login to your account</div>
      </div>
      <div className={style.singIn_block_content}>
        {datainput.map(({ type, placeholder, icon, eyes }, i) => (
          <div className={style.singIn_block_content_input_wrapper} key={`${type}_${i}`}>
            {icon}
            <input
              type={type}
              className={style.singIn_block_content_input}
              placeholder={placeholder}
              value={addValueInput(placeholder, type)}
              onChange={(e) => getUserData(e, placeholder, type)}
            />
            <div
              className={style.input_icon_eye}
              onMouseDown={() => visibilityPassword(i)}
              onMouseUp={() => hidePassword(i)}>
              {eyes}
            </div>
          </div>
        ))}
        {error.length > 0 && <AlertPassword textAlert={error} />}
        <div className={style.singIn_block_content_remember}>
          <div>
            <label>
              <div>
                {toggleCheckbox ? (
                  <BsFillCheckCircleFill className={style.input_check} />
                ) : (
                  <AiOutlineCheckCircle className={style.input} />
                )}
              </div>
              <input
                type="checkbox"
                className={style.checkbox}
                checked={toggleCheckbox}
                onChange={() => clickCheckbox()}
              />
              <span>Remember me</span>
            </label>
          </div>
          <div>Forgot Password?</div>
        </div>
        <button
          className={classNames(
            style.singIn_block_submit,
            checkDisabledBtn && style.singIn_block_submit_disabled,
          )}
          onClick={() => addUserAuth(userAuth)}
          disabled={checkDisabledBtn}>
          {loading ? <img src={Loading} alt="" /> : 'Login'}
        </button>
        <div className={style.singIn_block_content_account}>
          Don't have an account? <span>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
