import { IBaseModel } from './base.interface';

export interface IContact extends IBaseModel {
  fio: string;
  birthDay: string;
  info: string;
}