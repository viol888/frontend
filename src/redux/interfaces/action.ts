export interface IAction<T> {
  payload: any;
  type: T;
}