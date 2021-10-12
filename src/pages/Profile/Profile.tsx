import style from '../Profile/Profile.module.scss';
import React from 'react';
import { IUserLogo } from '../../components/AdminPanel/AdminPanelNav/AdminPanelNav';
import gnomeDef from '../../assets/img/gnomeDef.png';
import { MdOutlineModeEdit } from 'react-icons/md';

const Profile: React.FC<IUserLogo> = ({ logo = gnomeDef }) => {
  return (
    <div className={style.profile_block}>
      <h1>Profile</h1>
      <div className={style.profile_block_content}>
        <div className={style.profile_block_content_avatar}>
          <img src={gnomeDef} alt="" />
          <button className={style.profile_block_content_avatar_edit_btn}>
            <MdOutlineModeEdit /> Edit
          </button>
          <input type="file" name="" className={style.input_file} />
        </div>
        <div className={style.profile_block_content_desc}>
          <h2>Pesronal information</h2>
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
          <input type="text" name="" id="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
