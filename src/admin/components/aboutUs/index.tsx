import React from 'react';
import { Container } from '@material-ui/core';
import { Column } from 'material-table';
import { CrudComponent } from '../../shared/components/crud';
import { INews } from '../../../shared/interfaces/models/news.interface';

export const AboutUs = () => {
  const columns: Column<INews>[] = [
    { title: 'Порядок', field: 'order' },
    { title: 'Текст', field: 'paragraph' }
  ];
  return (
    <Container fixed>
      <CrudComponent
        columns={columns}
        collectionName={'about'}
        canUpdate={true}
        canDelete={true}
        canAdd={true}
      />
    </Container>
  );
};