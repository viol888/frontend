import { IBaseModel } from './base.interface';

export interface IAboutUs extends IBaseModel {
  order: number;
  paragraph: string;
}