import React from 'react';
import { AppBar, Toolbar, Grid, ButtonGroup, Button } from '@material-ui/core';
import { LogoutButton } from '../../../shared/buttons/logout';
import { useHistory, useRouteMatch } from 'react-router-dom';

export const Header = () => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const handleNavigationClick = (url: string) => {
    history.push(url);
  }

  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ButtonGroup variant="contained">
                <Button onClick={() => handleNavigationClick(`${url}/table`)}>Пациенты</Button>
                <Button onClick={() => handleNavigationClick(`${url}/workers`)}>Сотрудники</Button>
              </ButtonGroup>
              <div style={{float: 'right'}}>
                <LogoutButton />
              </div> 
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
}