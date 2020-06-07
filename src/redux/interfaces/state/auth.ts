import { ActionTypes } from '../../actions-types';

export interface IAuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isCheckCompleted: boolean;
}

export interface IAuthAction {
  type: ActionTypes,
  payload?: {
    isLoggedIn?: boolean;
    isAdmin?: boolean;
    isCheckCompleted?: boolean;
  };
}