import { ICrudState, ICrudAction } from '../interfaces/state/crud';
import { ActionTypes } from '../actions-types';

const initialState: ICrudState = {};

export const crudReducer = (state = initialState, action: ICrudAction) => {
    switch (action.type) {
        case ActionTypes.CRUD_SET_DATA:
            return {
                ...state,
                [action.payload.collection]: action.payload.data
            };
        default:
            return state;
    }
}