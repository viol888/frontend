import { IBaseModel } from './base.interface';
import { IContact } from './contact.interface';

export interface IInfo extends IBaseModel {
  fio: string;
  stayDateStart: string;
  stayDateEnd: string;
  department: string;
  contactList?: IContact[];
}