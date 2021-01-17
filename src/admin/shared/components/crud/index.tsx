import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaterialTable, { Column } from 'material-table';
import { IBaseModel } from '../../../../shared/interfaces/models/base.interface';
import { IStore } from '../../../../redux/interfaces/store/store';
import { addCrudData, updateCrudData, deleteCrudData, getCrudData } from '../../../../redux/actions/crud.actions';

interface ICrudProps<T extends IBaseModel> {
  collectionName: string;
  columns: Column<T>[];
  additionalQuery?: string;
  canAdd?: boolean;
  canUpdate?: boolean;
  canDelete?: boolean;
}

export const CrudComponent = <T extends IBaseModel>(props: ICrudProps<T>) => {
  const { columns, collectionName, additionalQuery, canAdd, canUpdate, canDelete } = props;

  const dispatch = useDispatch();
  const { data } = useSelector((state: IStore) => ({
    data: state.crud[collectionName] as T[]
  }));

  useEffect(() => {
    dispatch(getCrudData(additionalQuery ? `${collectionName}/${additionalQuery}` : collectionName));
  }, [collectionName, additionalQuery, dispatch])

  return (
    <MaterialTable
      title={collectionName}
      columns={columns}
      data={data}
      options={{
        filtering: true
      }}
      editable={{
        onRowAdd: canAdd ? newData => new Promise(resolve => {
          resolve({});
          dispatch(addCrudData(collectionName, newData));
        }): undefined,
        onRowUpdate: canUpdate ? (newData, oldData) => new Promise(resolve => {
          resolve({});
          if (oldData) {
            dispatch(updateCrudData(collectionName, newData));
          }
        }): undefined,
        onRowDelete: canDelete ? oldData => new Promise(resolve => {
          resolve({});
          dispatch(deleteCrudData(collectionName, oldData.id));
        }): undefined
      }}
    />
  );
}