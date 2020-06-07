export interface IServiceResult {
  isError: boolean;
  error?: {
    message: string;
  };
}