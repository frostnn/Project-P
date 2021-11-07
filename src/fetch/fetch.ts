import {
  API_CREATE_USER,
  API_AUTH_USER,
  API_UPDATE_USER,
  API_FRIENDS_USER,
} from '../constants/constants';
export interface iUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  confirm_hash: string;
}
export interface iAuthUser {
  [key: string]: any;
  id: number;
  email: string;
  name: string;
  confirmed: boolean;
  address: string;
  phone: string;
  last_name: string;
  avatar: string;
  telegram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  github: string;
  instagram: string;
  gitlab: string;
  snapchat: string;
}
export interface iResponse {
  status: string;
  message: string;
}
export interface iAuthUserData {
  email: string;
  password: string;
}

export interface iResponseFriends {
  id_user: number;
  id_friend: number;
  email: string;
  name: string | null;
  last_name: string | null;
  avatar: string | null;
}

export const createUser = async (data: iUser): Promise<iResponse> => {
  try {
    const res = await fetch(API_CREATE_USER, {
      method: 'POST',
      headers: {
        Origin: 'http://localhost:8080/',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const authUser = async (data: iAuthUserData): Promise<iAuthUser | string> => {
  try {
    const res = await fetch(API_AUTH_USER, {
      method: 'POST',
      headers: {
        Origin: 'http://localhost:8080/',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUser = async (data: iAuthUser): Promise<string> => {
  try {
    const res = await fetch(API_UPDATE_USER, {
      method: 'PUT',
      headers: {
        Origin: 'http://localhost:8080/',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFriends = async (id: { id: number }): Promise<iResponseFriends[]> => {
  try {
    const res = await fetch(API_FRIENDS_USER, {
      method: 'POST',
      headers: {
        Origin: 'http://localhost:8080/',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(id),
    });
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (error: any) {
    throw new Error(error);
  }
};
