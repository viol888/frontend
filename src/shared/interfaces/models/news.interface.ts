import { IBaseModel } from './base.interface';

export interface INews extends IBaseModel {
  title: string;
  description: string;
}