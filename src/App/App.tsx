import style from '../App/App.module.scss';
import Authentication from '../container/Authentication/Authentication';
import { Route, Switch, Redirect } from 'react-router';
import React from 'react';
import AdminPanel from '../components/AdminPanel/AdminPanel';
import { Context } from '../Context/Context';
import { iAuthUser, iResponseFriends, getFriends } from '../fetch/fetch';

const Main = () => {
  const [logged, setLogged] = React.useState<Boolean>(false);
  const [percentProfile, setPercentProfile] = React.useState<Number>(0);
  const [userFriends, setUserFriends] = React.useState<iResponseFriends[] | string>([]);
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
    linkedin: '',
    github: '',
    instagram: '',
    gitlab: '',
    snapchat: '',
  });

  const countPercent = () => {
    let n = 0;
    for (const key in userInfo) {
      if (key !== 'id' && key !== 'avatar' && key !== 'confirmed') {
        if (userInfo[key]) {
          n++;
        }
      }
    }
    const x = (n * 100) / 13;
    setPercentProfile(x);
  };

  const getAllFriends = async (id: { id: number }) => {
    const data = await getFriends(id);
    console.log(id);
    setUserFriends(data);
  };

  React.useEffect(() => {
    countPercent();
  }, [userInfo]);
  React.useEffect(() => {
    getAllFriends({ id: userInfo.id });
  }, []);

  console.log(userFriends);
  return (
    <Context.Provider
      value={{
        logged,
        setLogged,
        userInfo,
        setUserInfo,
        percentProfile,
        setPercentProfile,
        countPercent,
        userFriends,
        setUserFriends,
      }}>
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
