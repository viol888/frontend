import { IServiceResult } from './service-result.interface';

export interface ICrudResult<T> extends IServiceResult {
  data?: T;
}