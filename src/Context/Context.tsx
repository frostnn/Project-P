import React from 'react';
import { iAuthUser, iResponseFriends } from '../fetch/fetch';

interface IState {
  logged: Boolean;
  setLogged: (c: Boolean) => void;
  userInfo: iAuthUser;
  setUserInfo: (c: any) => void;
  percentProfile: Number;
  setPercentProfile: (c: any) => void;
  countPercent: () => void;
  setUserFriends: (c: any) => void;
  userFriends: iResponseFriends[] | string;
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
  userFriends: [],
  setLogged: () => {},
  setUserInfo: () => {},
  setPercentProfile: () => {},
  countPercent: () => {},
  setUserFriends: () => {},
});
