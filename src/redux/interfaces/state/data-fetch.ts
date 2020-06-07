import { ActionTypes } from '../../actions-types';

export interface IDataFetchState {
  isLoading: boolean;
  isError: boolean;
  message: string;
}

export interface IDataFetchAction {
  type: ActionTypes;
  payload: {
    isLoading: boolean;
    isError: boolean;
    message: string;
  };
}