import React, { useState } from 'react';
import { AppBar, Toolbar, Button, List, ListItem, ListItemText, Drawer, Grid } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { LogoutButton } from '../../../shared/buttons/logout';
import MenuIcon from '@material-ui/icons/Menu';

export const Header = () => {
  const history = useHistory();
  const { url } = useRouteMatch();

  const toPage = (link: string) => {
    history.push(link);
  }

  const [isOpen, setOpenState] = useState(false);

  const toggleDrawer = (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpenState(isOpen);
  };

  const handleHamburgerClick = (url: string) => {
    setOpenState(false);
    toPage(url);
  };

  const sideList = () => {
    return (
      <List>
        <ListItem button onClick={() => handleHamburgerClick(`${url}`)} >
          <ListItemText primary="Панель админа" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`${url}/news`)} >
          <ListItemText primary="Новостная панель" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`${url}/users`)} >
          <ListItemText primary="Панель пользователей" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`${url}/about`)} >
          <ListItemText primary="Информационная панель" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`/home`)} >
          <ListItemText primary="Публичный сайт" />
        </ListItem>
      </List>
    );
  }

  return (
    <header>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <Button onClick={toggleDrawer(true)} >
                <MenuIcon style={{ color: 'white' }} />
              </Button>
            </Grid>
            <Grid item xs={8} />
            <Grid item xs={3}>
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