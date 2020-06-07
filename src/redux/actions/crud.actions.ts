import { IBaseModel } from '../../shared/interfaces/models/base.interface';
import { getAllItems, addItem, updateItem, deleteItem } from '../../shared/services/crud';
import { Dispatch } from 'redux';
import { ActionTypes } from '../actions-types';

export const getCrudData = (collection: string, query?: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_START
  });

  const getResult = await getAllItems(query ? `${collection}?${query}` : collection);

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
      type: ActionTypes.CRUD_SET_DATA,
      payload: {
          collection,
          data: getResult.data
      }
  });

  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_STOP
  });
}

export const addCrudData = (collection: string, model: IBaseModel) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_START
  });

  const addResult = await addItem(model, collection);
  const getResult = await getAllItems(collection);
  dispatch({
      type: ActionTypes.CRUD_SET_DATA,
      payload: {
          collection,
          data: getResult.data
      }
  });

  if (getResult.isError || addResult.isError) {
    dispatch({
      type: ActionTypes.DATA_FETCH_SET_MESSAGE,
      payload: {
        isError: true,
        message: getResult.error?.message || addResult.error?.message
      }
    });
  }

  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_STOP
  });
}

export const updateCrudData = (collection: string, model: IBaseModel) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_START
  });

  const updateResult = await updateItem(model, collection);
  const getResult = await getAllItems(collection);
  dispatch({
      type: ActionTypes.CRUD_SET_DATA,
      payload: {
          collection,
          data: getResult.data
      }
  });

  if (getResult.isError || updateResult.isError) {
    dispatch({
      type: ActionTypes.DATA_FETCH_SET_MESSAGE,
      payload: {
        isError: true,
        message: getResult.error?.message || updateResult.error?.message
      }
    });
  }

  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_STOP
  });
}

export const deleteCrudData = (collection: string, id: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_START
  });

  const deleteResult = await deleteItem(id, collection);
  const getResult = await getAllItems(collection);
  dispatch({
      type: ActionTypes.CRUD_SET_DATA,
      payload: {
          collection,
          data: getResult.data
      }
  });

  if (getResult.isError || deleteResult.isError) {
    dispatch({
      type: ActionTypes.DATA_FETCH_SET_MESSAGE,
      payload: {
        isError: true,
        message: getResult.error?.message || deleteResult.error?.message
      }
    });
  }

  dispatch({
    type: ActionTypes.DATA_FETCH_LOADING_STOP
  });
}