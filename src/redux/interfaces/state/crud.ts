import { IBaseModel } from '../../../shared/interfaces/models/base.interface';
import { ActionTypes } from '../../actions-types';

export interface ICrudState {    
  [key: string]: IBaseModel[];
};

export interface ICrudAction {
  type: ActionTypes,
  payload: ICrudPayload
}

interface ICrudPayload {
  collection: string;
  data: IBaseModel[];
}