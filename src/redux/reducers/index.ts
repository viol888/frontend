import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { IStore } from '../interfaces/store/store';
import { crudReducer } from './crud';
import { rolesReducer } from './roles';
import { dataFetchReducer } from './data-fetch';

const rootReducer = combineReducers<IStore>({
  auth: authReducer,
  crud: crudReducer,
  roles: rolesReducer,
  dataFetch: dataFetchReducer
});

export {
  rootReducer
};