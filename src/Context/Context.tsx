import React from 'react';
import { iAuthUser } from '../fetch/fetch';

interface IState {
  logged: Boolean;
  setLogged: (c: Boolean) => void;
  userInfo: iAuthUser;
  setUserInfo: (c: any) => void;
  percentProfile: Number;
  setPercentProfile: (c: any) => void;
  countPercent: () => void;
}
export const Context = React.createContext<IState>({
  logged: false,
  percentProfile: 0,
  userInfo: {
    id: 0,
    name: '',
    email: '',
    confirmed: false,
    address: '',
    phone: '',
    avatar: '',
    last_name: '',
    telegram: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    github: '',
    instagram: '',
    gitlab: '',
    snapchat: '',
  },
  setLogged: () => {},
  setUserInfo: () => {},
  setPercentProfile: () => {},
  countPercent: () => {},
});
