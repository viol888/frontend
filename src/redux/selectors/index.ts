import { IStore } from '../interfaces/store/store';

const authSelector = (store: IStore) => store.auth;
const crudSelector = (store: IStore) => store.crud;
const rolesSelector = (store: IStore) => store.roles;

export {
  authSelector,
  crudSelector,
  rolesSelector
};