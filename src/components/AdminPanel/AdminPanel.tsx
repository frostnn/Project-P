import style from '../AdminPanel/AdminPanel.module.scss';
import React from 'react';
import { Context } from '../../Context/Context';
import { BiMenu } from 'react-icons/bi';
import { HiOutlineMail, HiOutlineBell } from 'react-icons/hi';
import gnomeDef from '../../assets/img/gnomeDef.png';
import { Route, Switch } from 'react-router';
import hr from '../../assets/img/xryha.png';
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
import routesConfig from '../../Routers/routersConfig';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface IUserLogo {
  logo: string;
}
interface INavList {
  title: string;
  icon: React.FunctionComponentElement<any>;
}

const AdminPanel: React.FC<IUserLogo> = ({ logo = gnomeDef }: IUserLogo) => {
  const { setLogged } = React.useContext(Context);
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
    <div className={style.admin_panel}>
      <div className={style.admin_panel_header}>
        <div className={style.admin_panel_header_nav}>
          <BiMenu />
        </div>
        <div className={style.admin_panel_header_wrapper_icon}>
          <div className={style.admin_panel_header_icon_message}>
            <HiOutlineMail />
          </div>
          <div className={style.admin_panel_header_icon_bell}>
            <HiOutlineBell />
          </div>
          <div className={style.admin_panel_header_icon_logo}>
            <img src={logo} alt="avatar" />
          </div>
          <div className={style.admin_panel_header_icon_gear}>
            <AiFillSetting />
          </div>
        </div>
      </div>
      <div className={style.admin_panel_content}>
        <div className={style.admin_panel_nav}>
          <ul className={style.admin_panel_nav_list}>
            {navList.map(({ title, icon }, i) => (
              <li
                className={classNames(
                  style.admin_panel_nav_list_item,
                  activeLink === i && style.admin_panel_nav_list_item_active_link,
                )}>
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
        <div className={style.admin_panel_content_page}>
          <Switch>
            {routesConfig.map(({ path, exact, component }, i) => (
              <Route path={path} component={component} exact={exact} key={`${path}_${i}`} />
            ))}
          </Switch>
        </div>
      </div>
    </div>
  );
};
{
  /* <button onClick={() => setLogged(false)}>Выйти</button> */
}
export default AdminPanel;
