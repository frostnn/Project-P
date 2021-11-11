import style from '../AdminPanel/AdminPanel.module.scss';
import React from 'react';
import { Route, Switch } from 'react-router';
import routesConfig from '../../Routers/routersConfig';
import AdminPanelHeader from './AdminPanelHeader/AdminPanelHeader';
import AdminPanelNav from './AdminPanelNav/AdminPanelNav';
console.log(routesConfig);
const AdminPanel: React.FC = () => {
  const [toggleMenu, setToggleMenu] = React.useState<boolean>(false);
  return (
    <div className={style.admin_panel}>
      <AdminPanelHeader toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <div className={style.admin_panel_content}>
        {toggleMenu && <AdminPanelNav />}
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
