import * as axios from 'axios';
import { getToken } from './auth';
import { IServerResponse } from '../interfaces/server-response.interface';

const instance = axios.default.create({
  baseURL: 'http://10.33.1.23:4000/api/'
});  

const getHeaders = (): axios.AxiosRequestConfig => {
  const token = getToken();
  return token ? {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  } : {};
}

export const getRequest = async <T>(url: string): Promise<T> => {
  const response = await instance.get<IServerResponse<T>>(url, getHeaders());
  return response.data.data;
}

export const postRequest = async <T>(url: string, data: any): Promise<T> => {
  const response = await instance.post<IServerResponse<T>>(url, data, getHeaders());
  return response.data.data;
}

export const putRequest = async <T>(url: string, data: any): Promise<T> => {
  const response = await instance.put<IServerResponse<T>>(url, data, getHeaders());
  return response.data.data;
}

export const deleteRequest = async (url: string): Promise<void> => {
  await instance.delete<IServerResponse<void>>(url, getHeaders());
}