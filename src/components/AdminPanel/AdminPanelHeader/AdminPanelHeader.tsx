import style from '../AdminPanelHeader/AdminPanelHeader.module.scss';
import React from 'react';
import { BiMenu } from 'react-icons/bi';
import { HiOutlineMail, HiOutlineBell } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { AiFillSetting } from 'react-icons/ai';
import classNames from 'classnames';
import { Context } from '../../../Context/Context';
import { NavLink } from 'react-router-dom';
import Time from '../../Time/Time';
import moment from 'moment';
interface IToggleMenu {
  toggleMenu: boolean;
  setToggleMenu: (c: boolean) => void;
}
const AdminPanelHeader: React.FC<IToggleMenu> = ({ toggleMenu, setToggleMenu }) => {
  const [toggleDasboard, setToggleDasboard] = React.useState<boolean>(false);
  const { setLogged } = React.useContext(Context);
  const toggleMenuList = (): void => setToggleMenu(!toggleMenu);
  const toggleDasboardList = (): void => setToggleDasboard(!toggleDasboard);
  const date = moment().format('ll');
  return (
    <div className={style.admin_panel_header}>
      <div className={style.admin_panel_header_nav} onClick={() => toggleMenuList()}>
        {!toggleMenu ? <BiMenu /> : <CgClose />}
      </div>

      <div className={style.admin_panel_header_wrapper_icon}>
        <div className={style.admin_panel_header_date}>{date}</div>
        <div className={style.admin_panel_header_icon_message}>
          <Time />
        </div>
        <div className={style.admin_panel_header_icon_message}>
          <HiOutlineMail />
        </div>
        <div className={style.admin_panel_header_icon_bell}>
          <HiOutlineBell />
        </div>
        <div
          className={classNames(style.admin_panel_header_icon_gear, toggleDasboard && style.active)}
          onClick={() => toggleDasboardList()}>
          <AiFillSetting />
          {toggleDasboard && (
            <div className={style.admin_panel_header_dasboard}>
              <ul className={style.admin_panel_header_dasboard_list}>
                <li className={style.admin_panel_header_dasboard_list_item}>
                  <NavLink to={`/login/Profile`}>Profile</NavLink>
                </li>
                <li className={style.admin_panel_header_dasboard_list_item}>
                  <NavLink to={`/login/Setting`}>Setting</NavLink>
                </li>
                <li
                  className={style.admin_panel_header_dasboard_list_item}
                  onClick={() => setLogged(false)}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanelHeader;
