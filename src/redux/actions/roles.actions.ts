import { Dispatch } from 'redux';
import { getAllItems } from '../../shared/services/crud';
import { ActionTypes } from '../actions-types';
import { IRole } from '../../shared/interfaces/models/role.interface';

export const getRoles = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_START
  });

  const getResult = await getAllItems<IRole>('roles');
  dispatch({
      type: ActionTypes.ROLES_SET,
      payload: {
          roles: getResult.data
      }
  });

  if (getResult.isError) {
    dispatch({
      type: ActionTypes.DATA_FETCH_SET_MESSAGE,
      payload: {
        isError: true,
        message: getResult.error?.message
      }
    });
  }

  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_STOP
  });
}