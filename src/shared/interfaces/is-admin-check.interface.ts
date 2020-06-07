import { IServiceResult } from './service-result.interface';

export interface IIsAdminCheck extends IServiceResult {
  isAdmin: boolean;
}