import style from '../AdminPanelNav/AdminPanelNav.module.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import {
  AiFillSetting,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineFile,
  AiOutlineMail,
  AiOutlineCalendar,
  AiOutlineUnorderedList,
  AiOutlineFileImage,
} from 'react-icons/ai';
import { Context } from '../../../Context/Context';
import gnomeDef from '../../../assets/img/gnomeDef.png';

interface INavList {
  title: string;
  icon: React.FunctionComponentElement<any>;
}
export interface IUserLogo {
  logo?: string;
}
const AdminPanelNav: React.FC<IUserLogo> = ({ logo = gnomeDef }) => {
  const { userInfo } = React.useContext(Context);
  const [activeLink, setActiveLink] = React.useState<number>(0);
  const getActiveLinkIndex = (index: number): void => {
    setActiveLink(index);
  };
  const navList: INavList[] = [
    {
      title: 'Home',
      icon: <AiOutlineHome />,
    },
    {
      title: 'Profile',
      icon: <AiOutlineUser />,
    },
    {
      title: 'Email',
      icon: <AiOutlineMail />,
    },
    {
      title: 'Calendar',
      icon: <AiOutlineCalendar />,
    },
    {
      title: 'Todo',
      icon: <AiOutlineUnorderedList />,
    },

    {
      title: 'Gallery',
      icon: <AiOutlineFileImage />,
    },
    {
      title: 'Documentations',
      icon: <AiOutlineFile />,
    },
    {
      title: 'Setting',
      icon: <AiFillSetting />,
    },
  ];
  return (
    <div className={style.admin_panel_nav}>
      <div className={style.admin_panel_header_info_acc}>
        <div className={style.admin_panel_header_icon_logo}>
          <img src={userInfo.avatar ? userInfo.avatar : logo} alt="avatar" />
        </div>
        <div className={style.admin_panel_header_name}>{userInfo.name}</div>
      </div>
      <ul className={style.admin_panel_nav_list}>
        {navList.map(({ title, icon }, i) => (
          <li
            className={classNames(
              style.admin_panel_nav_list_item,
              activeLink === i && style.admin_panel_nav_list_item_active_link,
            )}
            key={`${title}_${i}`}>
            <NavLink
              onClick={() => getActiveLinkIndex(i)}
              to={`/login\/${title}`}
              activeClassName={style.admin_panel_nav_list_item_active}>
              <span>{icon}</span>
              <span>{title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanelNav;
