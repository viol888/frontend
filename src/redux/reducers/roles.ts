import { ActionTypes } from '../actions-types';
import { IRolesState, IRolesAction } from '../interfaces/state/roles';

const initialState: IRolesState = {
  roles: []
};

export const rolesReducer = (state = initialState, action: IRolesAction) => {
    switch (action.type) {
        case ActionTypes.ROLES_SET:
            return {
                ...state,
                roles: action.payload.roles
            };
        default:
            return state;
    }
}