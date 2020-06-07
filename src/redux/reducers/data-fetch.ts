import { ActionTypes } from '../actions-types';
import { IDataFetchState, IDataFetchAction } from '../interfaces/state/data-fetch';

const initialState: IDataFetchState = {
  isError: false,
  isLoading: false,
  message: ''
};

export const dataFetchReducer = (state = initialState, action: IDataFetchAction): IDataFetchState => {
    switch (action.type) {
        case ActionTypes.DATA_FETCH_LOADING_START:
            return {
                ...state,
                isLoading: true
            };
        case ActionTypes.DATA_FETCH_LOADING_STOP:
            return {
                ...state,
                isLoading: false
            };
        case ActionTypes.DATA_FETCH_SET_MESSAGE:
              return {
                  ...state,
                  isError: action.payload.isError,
                  message: action.payload.message
              };
        case ActionTypes.DATA_FETCH_CLEAR_MESSAGE:
              return {
                  ...state,
                  message: ''
              };
        default:
            return state;
    }
}