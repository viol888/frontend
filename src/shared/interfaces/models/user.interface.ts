import { IBaseModel } from './base.interface';

export interface IUser extends IBaseModel {
  name: string,
  email: string,
  phone: string
  role: string;
}