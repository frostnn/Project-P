import React from 'react';
import { iAuthUser } from '../fetch/fetch';

interface IState {
  logged: Boolean;
  setLogged: (c: Boolean) => void;
  userInfo: iAuthUser;
  setUserInfo: (c: any) => void;
}
export const Context = React.createContext<IState>({
  logged: false,
  userInfo: {
    id: 0,
    name: '',
    email: '',
    confirmed: false,
    address: '',
    phone: '',
    avatar: '',
    last_name: '',
  },
  setLogged: () => {},
  setUserInfo: () => {},
});
