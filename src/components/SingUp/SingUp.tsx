import style from '../SingUp/SingUp.module.scss';
import { AiOutlineMail, AiOutlineUser, AiOutlineEye } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import React from 'react';

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
      icon: <RiLockPasswordLine className={style.input_icon} />,
      eyes: <AiOutlineEye />,
    },
    {
      type: 'password',
      placeholder: 'Confirm password',
      icon: <RiLockPasswordLine className={style.input_icon} />,
      eyes: <AiOutlineEye />,
    },
  ];

  return (
    <div className={style.singup_block}>
      <div>
        <button onClick={() => toggleAuth(null)}>Назад</button>
      </div>
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
              className={style.singup_block_content_input}
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
        <div className={style.singup_block_content_assent}>
          By signing you agree to our <span>Team of use</span> and <span>privacy notice</span>
        </div>
        <button className={style.singup_block_submit}>Sing Up</button>
        <div className={style.singup_block_content_account}>
          Don't have an account? <span>Sign up</span>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
