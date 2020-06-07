import { getStorageItem, setStorageItem, deleteStorageItem } from './storage';
import { ILogin } from '../interfaces/login.interface';
import { postRequest, getRequest } from './request';
import { ILoginResult } from '../interfaces/login-result.interface';
import { IRegister } from '../interfaces/register.interface';
import { IIsAdminCheck } from '../interfaces/is-admin-check.interface';

export const getToken = (): string | undefined => {
  const token = getStorageItem<string>('token');
  return token;
}

export const setToken = (token: string): void => {
  setStorageItem<string>('token', token);
}

export const removeToken = (): void => {
  deleteStorageItem('token');
}

export const loginRequest = async (data: ILogin): Promise<ILoginResult> => {
  try {
    const token = await postRequest<string>('auth/login', data);
    setToken(token);
    return {
      isLoggedIn: true,
      isError: false
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      error,
      isError: true
    };
  }
}

export const registerRequest = async (data: IRegister): Promise<ILoginResult> => {
  try {
    const token = await postRequest<string>('auth/register', data);
    setToken(token);
    return {
      isLoggedIn: true,
      isError: false
    };
  } catch (error) {
    return {
      isLoggedIn: false,
      error,
      isError: true
    };
  }
}

export const logoutRequest = (): ILoginResult => {
  removeToken();
  return {
    isLoggedIn: false,
    isError: false
  };
}

export const checkAdminRequest = async (): Promise<IIsAdminCheck> => {
  try {
    const result = await getRequest<IIsAdminCheck>('auth/isAdmin');
    return {
      isAdmin: result.isAdmin,
      isError: false
    };
  } catch (error) {
    return {
      isAdmin: false,
      error,
      isError: true
    };
  }
}