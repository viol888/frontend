import { IAuthState } from '../state/auth';
import { ICrudState } from '../state/crud';
import { IRolesState } from '../state/roles';
import { IDataFetchState } from '../state/data-fetch';

export interface IStore {
  auth: IAuthState;
  crud: ICrudState;
  roles: IRolesState;
  dataFetch: IDataFetchState;
}