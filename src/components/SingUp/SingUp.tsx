import style from '../SingUp/SingUp.module.scss';
import { AiOutlineMail, AiOutlineUser, AiOutlineEye } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import React from 'react';
import ButtonBack from '../ButtonBack/ButtonBack';
import { createUser, iUser, iResponse } from '../../fetch/fetch';
import classNames from 'classnames';
import AlertPassword from '../AlertPassword/AlertPassword';
import Response from '../Response/Response';
import Loading from '../../assets/img/loading.svg';
interface iInput {
  type: string;
  placeholder: string;
  icon: React.FunctionComponentElement<any>;
  eyes?: React.FunctionComponentElement<any>;
}
interface iSingUp {
  toggleAuth: (index: number | null) => void;
}

const SingUp: React.FC<iSingUp> = ({ toggleAuth }) => {
  const [userData, setUserData] = React.useState<iUser>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    confirm_hash: '',
  });
  const [response, setResponse] = React.useState<iResponse | null>(null);
  const [failPassword, setFailPassword] = React.useState<Boolean>(false);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const visibilityPassword = (index: number) => {
    const input = document.querySelectorAll<HTMLInputElement>(
      '.SingUp_singup_block_content_input__3xTgd',
    );
    input[index].setAttribute('type', 'text');
  };
  const hidePassword = (index: number) => {
    const input = document.querySelectorAll<HTMLInputElement>(
      '.SingUp_singup_block_content_input__3xTgd',
    );
    input[index].setAttribute('type', 'password');
  };
  const getUserData = (
    e: React.ChangeEvent<HTMLInputElement>,
    placeholder: string,
    type: string,
  ) => {
    if (placeholder === 'Password' && type === 'password') {
      setUserData({ ...userData, password: e.target.value });
    } else if (placeholder === 'Email' && type === 'email') {
      setUserData({ ...userData, email: e.target.value });
    } else if (placeholder === 'Confirm password' && type === 'password') {
      setUserData({ ...userData, passwordConfirm: e.target.value });
    } else if (placeholder === 'Name' && type === 'text') {
      setUserData({ ...userData, name: e.target.value });
    }
    userData.password === e.target.value ? setFailPassword(false) : setFailPassword(true);
  };
  const addValueInput = (placeholder: string, type: string) => {
    if (placeholder === 'Name' && type === 'text') {
      return userData.name;
    } else if (placeholder === 'Email' && type === 'email') {
      return userData.email;
    } else if (placeholder === 'Password' && type === 'password') {
      return userData.password;
    } else if (placeholder === 'Confirm password' && type === 'password') {
      return userData.passwordConfirm;
    }
  };

  const datainput: iInput[] = [
    {
      type: 'text',
      placeholder: 'Name',
      icon: <AiOutlineUser className={style.input_icon} />,
    },
    {
      type: 'email',
      placeholder: 'Email',
      icon: <AiOutlineMail className={style.input_icon} />,
    },
    {
      type: 'password',
      placeholder: 'Password',
      icon: (
        <RiLockPasswordLine
          className={classNames(
            style.input_icon,
            failPassword && userData.password && userData.passwordConfirm && style.icon_error,
          )}
        />
      ),
      eyes: (
        <AiOutlineEye
          className={
            failPassword && userData.password && userData.passwordConfirm && style.show_password
          }
        />
      ),
    },
    {
      type: 'password',
      placeholder: 'Confirm password',
      icon: (
        <RiLockPasswordLine
          className={classNames(
            style.input_icon,
            failPassword && userData.password && userData.passwordConfirm && style.icon_error,
          )}
        />
      ),
      eyes: (
        <AiOutlineEye
          className={
            failPassword && userData.password && userData.passwordConfirm && style.show_password
          }
        />
      ),
    },
  ];
  const checkDisabledBtn =
    failPassword ||
    !userData.password ||
    !userData.passwordConfirm ||
    !userData.name ||
    !userData.email
      ? true
      : false;

  const addCreateUser = async () => {
    setLoading(true);
    try {
      const text = await createUser(userData);
      setResponse(text);
      if (text.status === 'success') {
        setUserData({
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
          confirm_hash: '',
        });
      }
    } catch (error: any) {
      console.log(`Could not fetch - ${error}`);
    }
    setLoading(false);
  };
  React.useEffect(() => {
    setTimeout(() => {
      setResponse(null);
    }, 4000);
  }, [response]);

  return (
    <div className={style.singup_block}>
      <ButtonBack toggleAuth={toggleAuth} />
      <div className={style.singup_block_title}>
        <div className={style.singup_block_maintitle}>Register</div>
        <div className={style.singup_block_subtitle}>Create your new account</div>
      </div>
      <div className={style.singup_block_content}>
        {datainput.map(({ type, placeholder, icon, eyes }, i) => (
          <div className={style.singup_block_content_input_wrapper} key={`${type}_${i}`}>
            {icon}
            <input
              type={type}
              value={addValueInput(placeholder, type)}
              className={classNames(
                style.singup_block_content_input,
                type === 'password' &&
                  failPassword &&
                  userData.password &&
                  userData.passwordConfirm &&
                  style.error_input,
              )}
              placeholder={placeholder}
              onChange={(e) => getUserData(e, placeholder, type)}
            />
            {eyes && (
              <div
                className={style.input_icon_eye}
                onMouseDown={() => visibilityPassword(i)}
                onMouseUp={() => hidePassword(i)}>
                {eyes}
              </div>
            )}
            {i === 3 && failPassword && userData.password && userData.passwordConfirm && (
              <AlertPassword textAlert={'Пароли не совпадают'} />
            )}
          </div>
        ))}
        <div className={style.singup_block_content_assent}>
          By signing you agree to our <span>Team of use</span> and <span>privacy notice</span>
        </div>
        <button
          className={classNames(
            style.singup_block_submit,
            checkDisabledBtn && style.singup_block_submit_disabled,
          )}
          disabled={checkDisabledBtn}
          onClick={() => addCreateUser()}>
          {loading ? <img src={Loading} alt="" /> : 'Sing Up'}
        </button>
        <div className={style.singup_block_content_account}>
          Don't have an account? <span>Sign up</span>
        </div>

        {response && <Response {...response} />}
      </div>
    </div>
  );
};

export default SingUp;
