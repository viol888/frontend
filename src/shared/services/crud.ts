import { IBaseModel } from '../interfaces/models/base.interface';
import { getRequest, putRequest, deleteRequest, postRequest } from './request';
import { ICrudResult } from '../interfaces/crud-result.interface';

export const getAllItems = async <T extends IBaseModel>(collection: string): Promise<ICrudResult<T[]>> => {
  try {
    const data = await getRequest<T[]>(collection);
    return {
      data,
      isError: false
    };
  } catch (error) {
    return {
      data: [],
      isError: true,
      error
    };
  }
}

export const updateItem = async <T extends IBaseModel>(model: T, collection: string): Promise<ICrudResult<T | undefined>> => {
  try {
    const data = await putRequest<T>(collection, model);
    return {
      data,
      isError: false
    };
  } catch (error) {
    return {
      isError: true,
      error
    };
  }
}

export const deleteItem = async (id: string, collection: string): Promise<ICrudResult<void>> => {
  try {
    await deleteRequest(`${collection}/${id}`);
    return {
      isError: false
    };
  } catch (error) {
    return {
      isError: true,
      error
    };
  }
}

export const addItem = async <T extends IBaseModel>(model: T, collection: string): Promise<ICrudResult<T | undefined>> => {
  try {
    const data = await postRequest<T>(collection, model);
    return {
      data,
      isError: false
    };
  } catch (error) {
    return {
      isError: true,
      error
    };
  }
}