import { API_CREATE_USER } from '../constants/constants';
export interface iUser {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  user_id: string;
}
export interface iResponse {
  status: string;
  message: string;
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
