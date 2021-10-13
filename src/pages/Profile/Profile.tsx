import style from '../Profile/Profile.module.scss';
import React from 'react';
import { IUserLogo } from '../../components/AdminPanel/AdminPanelNav/AdminPanelNav';
import gnomeDef from '../../assets/img/gnomeDef.png';
import { MdOutlineModeEdit } from 'react-icons/md';
import classNames from 'classnames';
import { Context } from '../../Context/Context';

const Profile: React.FC<IUserLogo> = ({ logo = gnomeDef }) => {
  const inputFile = React.useRef<HTMLInputElement>(null);
  const [toggleEdit, setToggleEdit] = React.useState<boolean>(false);
  const { userInfo } = React.useContext(Context);
  const clickInputFile = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  const toggleEditProfile = () => setToggleEdit(!toggleEdit);
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
                  <div className={style.profile_block_content_info_input}>{userInfo.name}</div>
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
                    {userInfo.name}
                  </div>
                </label>
                <label>
                  Phone
                  <div className={style.profile_block_content_info_input}>{userInfo.name}</div>
                </label>
              </div>
              <label>
                Address
                <div
                  className={classNames(
                    style.profile_block_content_info_input,
                    style.info_input_custom,
                  )}>
                  {userInfo.name}
                </div>{' '}
              </label>
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
                    className={classNames(
                      style.profile_block_content_info_input,
                      style.info_input_custom,
                    )}
                  />
                </label>
                <label>
                  Last name
                  <input type="text" name="" className={style.profile_block_content_info_input} />
                </label>
              </div>
              <div className={style.profile_block_content_info_input_wrapper}>
                <label>
                  Email
                  <input
                    type="text"
                    name=""
                    className={classNames(
                      style.profile_block_content_info_input,
                      style.info_input_custom,
                    )}
                  />
                </label>
                <label>
                  Phone
                  <input type="text" name="" className={style.profile_block_content_info_input} />
                </label>
              </div>
              <label>
                Address
                <input type="text" name="" className={style.profile_block_content_info_input} />
              </label>
              <div>
                <button className={style.info_save_btn}>Save</button>
                <button className={style.info_close_btn} onClick={() => toggleEditProfile()}>
                  Close
                </button>
              </div>
            </div>
          )}

          <div className={style.profile_block_content_avatar}>
            <img src={logo} alt="" />
            <button
              className={style.profile_block_content_avatar_edit_btn}
              onClick={clickInputFile}>
              <MdOutlineModeEdit /> Edit
            </button>
            <input type="file" name="" className={style.input_file} ref={inputFile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
