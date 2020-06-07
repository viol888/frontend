import { IServiceResult } from './service-result.interface';

export interface ILoginResult extends IServiceResult {
  isLoggedIn: boolean;
}