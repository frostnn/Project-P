import style from '../Profile/Profile.module.scss';
import React from 'react';
import { IUserLogo } from '../../components/AdminPanel/AdminPanelNav/AdminPanelNav';
import gnomeDef from '../../assets/img/gnomeDef.png';
import { MdOutlineModeEdit } from 'react-icons/md';
import {
  AiOutlineGithub,
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineGitlab,
} from 'react-icons/ai';
import { FaTelegramPlane, FaSnapchatGhost } from 'react-icons/fa';
import classNames from 'classnames';
import { Context } from '../../Context/Context';
import { updateUser } from '../../fetch/fetch';
import Response from '../../components/Response/Response';
import Loading from '../../assets/img/loading.svg';
import SocialBlock from '../../components/SocialBlock/SocialBlock';

export interface iSocial {
  social: string;
  icon: React.FunctionComponentElement<any>;
  selected: boolean;
}

const Profile: React.FC<IUserLogo> = ({ logo = gnomeDef }) => {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const [toggleSocial, setToggleSocial] = React.useState<boolean>(false);
  const { userInfo, setUserInfo } = React.useContext(Context);
  const [responseUpdate, setResponseUpdate] = React.useState<string>('');
  const [disabledBtnSave, setDisabledBtnSave] = React.useState<boolean>(false);
  const [visibilityBtnSaveAvatar, setVisibilityBtnSaveAvatar] = React.useState<boolean>(false);
  const [socialItems, setSocialItems] = React.useState<iSocial[]>([
    {
      social: 'Telegram',
      icon: <FaTelegramPlane />,
      selected: false,
    },
    {
      social: 'Facebook',
      icon: <AiOutlineFacebook />,
      selected: false,
    },
    {
      social: 'Twitter',
      icon: <AiOutlineTwitter />,
      selected: false,
    },
    {
      social: 'LinkedIn',
      icon: <AiOutlineLinkedin />,
      selected: false,
    },
    {
      social: 'Instagram',
      icon: <AiOutlineInstagram />,
      selected: false,
    },
    {
      social: 'Github',
      icon: <AiOutlineGithub />,
      selected: false,
    },
    {
      social: 'Gitlab',
      icon: <AiOutlineGitlab />,
      selected: false,
    },
    {
      social: 'Snapchat',
      icon: <FaSnapchatGhost />,
      selected: false,
    },
  ]);
  const clickInputFile = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  const getNewDataProfile = (e: React.ChangeEvent<HTMLInputElement>, name: string): void => {
    setUserInfo({
      ...userInfo,
      [name.toLocaleLowerCase()]: e.target.value,
    });
  };
  const updateProfile = async () => {
    setDisabledBtnSave(true);
    if (userInfo.email) {
      const data = await updateUser(userInfo);
      setResponseUpdate(data);
    } else {
      console.log('Вы забыли емайл');
    }
    setDisabledBtnSave(false);
  };
  const toggleEditProfile = () => setToggleEdit(!toggleEdit);
  const toggleSocialBlock = () => setToggleSocial(!toggleSocial);
  const countAddSocial = () => {
    const countSocial = socialItems.filter((item) => item.selected).length;
    if (countSocial > 0) {
      return countSocial;
    }
    return '';
  };
  const getUrlImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setUserInfo({
            ...userInfo,
            avatar: e.target.result,
          });
        }
      };
      reader.readAsDataURL(files);
    }
    setVisibilityBtnSaveAvatar(true);
  };
  const saveAvatar = async () => {
    if (userInfo.email) {
      await updateUser(userInfo);
    } else {
      console.log('Вы забыли емайл');
    }
    setTimeout(() => {
      setVisibilityBtnSaveAvatar(false);
    }, 500);
  };
  React.useEffect(() => {
    setTimeout(() => {
      setResponseUpdate('');
    }, 4000);
  }, [responseUpdate]);
  console.log(userInfo);
  return (
    <div className={style.profile_block}>
      <h1>Profile</h1>
      <div className={style.profile_block_content}>
        <div className={style.profile_block_content_info}>
          {!toggleEdit ? (
            <div className={style.profile_block_content_info_wrapper}>
              <div className={style.profile_block_content_info_input_wrapper}>
                <label>
                  First name
                  <div
                    className={classNames(
                      style.profile_block_content_info_input,
                      style.info_input_custom,
                    )}>
                    {userInfo.name}
                  </div>
                </label>
                <label>
                  Last name
                  <div className={style.profile_block_content_info_input}>{userInfo.last_name}</div>
                </label>
              </div>
              <div className={style.profile_block_content_info_input_wrapper}>
                <label>
                  Email
                  <div
                    className={classNames(
                      style.profile_block_content_info_input,
                      style.info_input_custom,
                    )}>
                    {userInfo.email}
                  </div>
                </label>
                <label>
                  Phone
                  <div className={style.profile_block_content_info_input}>{userInfo.phone}</div>
                </label>
              </div>
              <label>
                Address
                <div
                  className={classNames(
                    style.profile_block_content_info_input,
                    style.info_input_custom,
                  )}>
                  {userInfo.address}
                </div>
              </label>
              <div className={style.profile_block_content_info_social}>
                {socialItems.map(
                  ({ social, selected }, i) =>
                    selected && (
                      <label key={`${social}_${i}`}>
                        {social}
                        <div className={style.profile_block_content_info_input}>
                          {userInfo[social.toLocaleLowerCase()]}
                        </div>
                      </label>
                    ),
                )}
              </div>
              <button className={style.info_edit_btn} onClick={() => toggleEditProfile()}>
                Edit profile
              </button>
            </div>
          ) : (
            <div className={style.profile_block_content_info_wrapper}>
              <div className={style.profile_block_content_info_input_wrapper}>
                <label>
                  First name
                  <input
                    value={userInfo.name}
                    type="text"
                    name=""
                    onChange={(e) => getNewDataProfile(e, 'name')}
                    className={classNames(
                      style.profile_block_content_info_input,
                      style.info_input_custom,
                    )}
                  />
                </label>
                <label>
                  Last name
                  <input
                    value={userInfo.last_name}
                    type="text"
                    name=""
                    onChange={(e) => getNewDataProfile(e, 'last_name')}
                    className={style.profile_block_content_info_input}
                  />
                </label>
              </div>
              <div className={style.profile_block_content_info_input_wrapper}>
                <label>
                  Email
                  <input
                    value={userInfo.email}
                    type="text"
                    name=""
                    onChange={(e) => getNewDataProfile(e, 'email')}
                    className={classNames(
                      style.profile_block_content_info_input,
                      style.info_input_custom,
                    )}
                  />
                </label>
                <label>
                  Phone
                  <input
                    type="text"
                    name=""
                    onChange={(e) => getNewDataProfile(e, 'phone')}
                    value={userInfo.phone}
                    className={style.profile_block_content_info_input}
                  />
                </label>
              </div>
              <label>
                Address
                <input
                  type="text"
                  name=""
                  onChange={(e) => getNewDataProfile(e, 'address')}
                  value={userInfo.address}
                  className={style.profile_block_content_info_input}
                />
              </label>
              <div className={style.profile_block_content_info_social}>
                {socialItems.map(
                  ({ social, selected }) =>
                    selected && (
                      <label key={social}>
                        {social}
                        <input
                          type="text"
                          name=""
                          onChange={(e) => getNewDataProfile(e, social)}
                          value={userInfo[social.toLocaleLowerCase()] as string}
                          className={style.profile_block_content_info_input}
                        />
                      </label>
                    ),
                )}
              </div>

              <div className={style.info_btn_wrapper}>
                <button
                  className={classNames(style.info_save_btn, disabledBtnSave && style.disabled)}
                  onClick={() => updateProfile()}>
                  {disabledBtnSave ? <img src={Loading} alt="" /> : 'Save'}
                </button>
                <button className={style.info_close_btn} onClick={() => toggleEditProfile()}>
                  Close
                </button>
                <button className={style.info_social_btn} onClick={() => toggleSocialBlock()}>
                  {toggleSocial ? `Selected social ${countAddSocial()}` : 'Add social'}
                </button>
                {toggleSocial && (
                  <SocialBlock socialItems={socialItems} setSocialItems={setSocialItems} />
                )}
              </div>
            </div>
          )}

          <div className={style.profile_block_content_avatar}>
            <img src={userInfo.avatar ? userInfo.avatar : logo} alt="" />
            <button
              className={style.profile_block_content_avatar_edit_btn}
              onClick={clickInputFile}>
              <MdOutlineModeEdit /> Edit
            </button>
            <input
              type="file"
              name=""
              className={style.input_file}
              ref={inputFile}
              onChange={getUrlImg}
            />
            {visibilityBtnSaveAvatar && (
              <button
                onClick={() => saveAvatar()}
                className={style.profile_block_content_avatar_save_btn}>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
      {responseUpdate && <Response status={'noerror'} message={responseUpdate} />}
    </div>
  );
};

export default Profile;
