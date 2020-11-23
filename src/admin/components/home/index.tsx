import React from 'react';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const Home = () => {
  
  const history = useHistory();
  history.push('/home/table');
  return (
    <Container fixed>
      <h1>Welcome!</h1>
    </Container>
  );
};