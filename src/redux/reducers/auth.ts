import { IAction } from '../interfaces/action';
import { IAuthState } from '../interfaces/state/auth';
import { ActionTypes } from '../actions-types';

const initialState: IAuthState = {
  isLoggedIn: false,
  isAdmin: false,
  isCheckCompleted: false
}

export const authReducer = (state = initialState, action: IAction<ActionTypes>): IAuthState => {
  switch (action.type) {
    case ActionTypes.AUTH_LOG_IN: 
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        isAdmin: action.payload.isAdmin
      };
    case ActionTypes.AUTH_REGISTER: 
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        isAdmin: action.payload.isAdmin
      };
    case ActionTypes.AUTH_LOG_OUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false
      };
    case ActionTypes.AUTH_CHECK_LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        isAdmin: action.payload.isAdmin,
        isCheckCompleted: action.payload.isCheckCompleted ? true : false
      };
    case ActionTypes.AUTH_START_CHECK:
      return {
        ...state,
        isCheckCompleted: false
      };
    default:
      return state;
  }
}