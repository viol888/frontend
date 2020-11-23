import { IBaseModel } from './base.interface';

export interface IWorker extends IBaseModel {
  fio: string;
  positiveResultDate: string;
  position: string;
}