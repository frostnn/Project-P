import style from '../App/App.module.scss';
import Authentication from '../container/Authentication/Authentication';
import { Route, Switch, Redirect } from 'react-router';
import React from 'react';
import AdminPanel from '../components/AdminPanel/AdminPanel';
import { Context } from '../Context/Context';
import { iAuthUser } from '../fetch/fetch';

const Main = () => {
  const [logged, setLogged] = React.useState<Boolean>(false);

  const [userInfo, setUserInfo] = React.useState<iAuthUser>({
    id: 0,
    name: '',
    email: '',
    confirmed: false,
    address: '',
    phone: '',
    last_name: '',
    avatar: '',
    telegram: '',
    facebook: '',
    twitter: '',
    linkedIn: '',
    github: '',
    instagram: '',
    gitlab: '',
    snapchat: '',
  });
  console.log(userInfo);
  return (
    <Context.Provider value={{ logged, setLogged, userInfo, setUserInfo }}>
      <div className={style.main_block}>
        {logged ? <Redirect to={'/login/Home'} /> : <Redirect to={'/'} />}
        <Switch>
          <Route path={'/login'} component={AdminPanel} />
          <Route path={'/'} exact={true}>
            <Authentication />
          </Route>
        </Switch>
      </div>
    </Context.Provider>
  );
};

export default Main;
