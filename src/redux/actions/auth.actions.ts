import { ILogin } from '../../shared/interfaces/login.interface';
import { IRegister } from '../../shared/interfaces/register.interface';
import { loginRequest, removeToken, checkAdminRequest, registerRequest, getToken } from '../../shared/services/auth';
import { Dispatch } from 'redux';
import { ActionTypes } from '../actions-types';

export const login = (data: ILogin) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_START
  });

  const loginResult = await loginRequest(data);

  if (loginResult.isError) {
    dispatch({
      type: ActionTypes.DATA_FETCH_SET_MESSAGE,
      payload: {
        isError: true,
        message: loginResult.error?.message
      }
    });
  }

  let isAdmin = true;

  // if (loginResult.isLoggedIn) {
  //   const adminCheckResult = await checkAdminRequest();

  //   if (adminCheckResult.isError) {
  //     dispatch({
  //       type: ActionTypes.DATA_FETCH_SET_MESSAGE,
  //       payload: {
  //         isError: true,
  //         message: adminCheckResult.error?.message
  //       }
  //     });
  //   }

  //   isAdmin = adminCheckResult.isAdmin;
  // }

  dispatch({
    type: ActionTypes.AUTH_LOG_IN,
    payload: {
      isLoggedIn: loginResult.isLoggedIn,
      isAdmin,
      isCheckCompleted: true
    }
  });

  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_STOP
  });
}

export const logout = () => async (dispatch: Dispatch) => {
  removeToken();
  dispatch({
    type: ActionTypes.AUTH_LOG_OUT,
    payload: {}
  });
}

export const register = (data: IRegister) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_START
  });

  const registerResult = await registerRequest(data);

  if (registerResult.isError) {
    dispatch({
      type: ActionTypes.DATA_FETCH_SET_MESSAGE,
      payload: {
        isError: true,
        message: registerResult.error?.message
      }
    });
  }

  let isAdmin = false;
  if (registerResult.isLoggedIn) {
    const adminCheckResult = await checkAdminRequest();

    if (adminCheckResult.isError) {
      dispatch({
        type: ActionTypes.DATA_FETCH_SET_MESSAGE,
        payload: {
          isError: true,
          message: adminCheckResult.error?.message
        }
      });
    }

    isAdmin = adminCheckResult.isAdmin;
  }

  dispatch({
    type: ActionTypes.AUTH_REGISTER,
    payload: {
      isLoggedIn: registerResult.isLoggedIn,
      isAdmin,
      isCheckCompleted: true
    }
  });

  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_STOP
  });
}

export const checkLogin = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.AUTH_START_CHECK
  });
  const token = getToken();
  if (token) {
    dispatch({
      type: ActionTypes.DATA_FETCH_LOADING_START
    });
    
    // const adminCheckResult = await checkAdminRequest();

    // if (adminCheckResult.isError) {
    //   dispatch({
    //     type: ActionTypes.DATA_FETCH_SET_MESSAGE,
    //     payload: {
    //       isError: true,
    //       message: adminCheckResult.error?.message
    //     }
    //   });
    // }

    dispatch({
      type: ActionTypes.AUTH_CHECK_LOGIN,
      payload: {
        isLoggedIn: true,
        isAdmin: true,
        isCheckCompleted: true
      }
    });
    
    dispatch({
      type: ActionTypes.DATA_FETCH_LOADING_STOP
    });
  } else {
    dispatch({
      type: ActionTypes.AUTH_CHECK_LOGIN,
      payload: {
        isLoggedIn: false,
        isAdmin: false,
        isCheckCompleted: true
      }
    });
  }
}