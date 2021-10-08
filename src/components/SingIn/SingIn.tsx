import style from '../SingIn/SingIn.module.scss';
import { AiOutlineMail, AiOutlineEye, AiOutlineCheckCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import React from 'react';
import ButtonBack from '../ButtonBack/ButtonBack';

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
  const [toggleCheckbox, setToggleCheckbox] = React.useState(false);
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
            />
            <div
              className={style.input_icon_eye}
              onMouseDown={() => visibilityPassword(i)}
              onMouseUp={() => hidePassword(i)}>
              {eyes}
            </div>
          </div>
        ))}
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
        <button className={style.singIn_block_submit}>Login</button>
        <div className={style.singIn_block_content_account}>
          Don't have an account? <span>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default SingIn;
