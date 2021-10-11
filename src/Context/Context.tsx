import React from 'react';
import { iAuthUser } from '../fetch/fetch';

interface Ilogged {
  logged: Boolean;
  setLogged: (c: Boolean) => void;
  userInfo: iAuthUser;
  setUserInfo: (c: any) => void;
}
export const Context = React.createContext<Ilogged>({
  logged: false,
  userInfo: { id: 0, name: '', confirmed: false },
  setLogged: () => {},
  setUserInfo: () => {},
});
