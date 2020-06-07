import React from 'react';
import { Paper } from '@material-ui/core';
import { Column } from 'material-table';
import { CrudComponent } from '../../shared/components/crud';
import { INews } from '../../../shared/interfaces/models/news.interface';

export const News = () => {
  const columns: Column<INews>[] = [
    { title: 'Заголовок', field: 'title' },
    { title: 'Описание', field: 'description' }
  ];
  return (
    <Paper elevation={3}>
      <CrudComponent
        columns={columns}
        collectionName={'news'}
        canUpdate={true}
        canDelete={true}
        canAdd={true}
      />
    </Paper>
  );
};