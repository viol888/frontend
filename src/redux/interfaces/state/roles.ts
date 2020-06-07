import { ActionTypes } from '../../actions-types';
import { IRole } from '../../../shared/interfaces/models/role.interface';

export interface IRolesState {
  roles: IRole[];
}

export interface IRolesAction {
  type: ActionTypes,
  payload: {
    roles: IRole[];
  };
}