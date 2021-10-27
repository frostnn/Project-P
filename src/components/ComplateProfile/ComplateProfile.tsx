import style from '../ComplateProfile/ComplateProfile.module.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../Context/Context';

const ComplateProfile: React.FC = () => {
  const { percentProfile } = React.useContext(Context);
  return (
    <div className={style.complate_profile}>
      <div className={style.complate_profile_wrapper}>
        <div className={style.complate_profile_percent}>{Math.ceil(percentProfile as number)}%</div>
        <div className={style.complate_profile_text}>
          <h3>Profile information</h3>
          <p>complete you profile to unlock all features</p>
        </div>
      </div>
      <NavLink to={'/login/Profile'} className={style.complate_profile_link}>
        Complete my profile
      </NavLink>
    </div>
  );
};

export default ComplateProfile;
