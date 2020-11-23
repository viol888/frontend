import React from 'react';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const NoMatch = () => {
  return (
    <Container fixed>
      <h1>Страница не найдена</h1>
      <Link to="/home/table">Домой</Link>
    </Container>
  );
};