import React, { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { Column } from 'material-table';
import { CrudComponent } from '../../shared/components/crud';
import { IUser } from '../../../shared/interfaces/models/user.interface';
import { useDispatch, useSelector } from 'react-redux';
import { getRoles } from '../../../redux/actions/roles.actions';
import { IStore } from '../../../redux/interfaces/store/store';

export const Users = () => {
  const { roles } = useSelector((state: IStore) => ({
    roles: state.roles.roles
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles())
  }, [dispatch]);

  const rolesObject: {
    [key: string]: string;
  } = {};
  roles.forEach(role => rolesObject[role.id] = role.name);

  const columns: Column<IUser>[] = [
    { title: 'Имя', field: 'name' },
    { title: 'Почта', field: 'email' },
    { title: 'Телефон', field: 'phone' },
    { title: 'Роль', field: 'role', lookup: rolesObject }
  ];
  return (
    <Container fixed>
      <CrudComponent
        columns={columns}
        collectionName={'user'}
        canUpdate={true}
      />
    </Container>
  );
};