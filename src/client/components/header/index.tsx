import React, { useState } from 'react';
import { AppBar, Toolbar, Button, List, ListItem, Drawer, Grid, ListItemText, Typography } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IStore } from '../../../redux/interfaces/store/store';
import { LogoutButton } from '../../../shared/buttons/logout';
import { LoginButton } from '../../../shared/buttons/login';
import MenuIcon from '@material-ui/icons/Menu';

export const Header = () => {
  const { isLoggedIn, isAdmin } = useSelector((state: IStore) => ({
    isLoggedIn: state.auth.isLoggedIn,
    isAdmin: state.auth.isAdmin
  }));
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
  }

  const sideList = () => {
    return (
      <List>
        <ListItem button onClick={() => handleHamburgerClick(`${url}`)} >
          <ListItemText primary="Домашняя страница" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`${url}/news`)} >
          <ListItemText primary="Новости" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`${url}/teachers`)} >
          <ListItemText primary="Учителя" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`${url}/about`)} >
          <ListItemText primary="О нас" />
        </ListItem>
        <ListItem button onClick={() => handleHamburgerClick(`${url}/contacts`)} >
          <ListItemText primary="Контакты" />
        </ListItem>
        {isAdmin && <ListItem button onClick={() => handleHamburgerClick(`/admin`)} >
          <ListItemText primary="Страница админа" />
        </ListItem>}
      </List>
    );
  }


  return (
    <header>
      <Drawer open={isOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
      <AppBar position="static" style={{ backgroundColor: "#2196f3" }}>
        <Toolbar>
          <Grid container spacing={3}>
            <Grid item xs={1}>
              <Button onClick={toggleDrawer(true)} style={{ color: 'white' }} >
                Меню
              </Button>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">
                Лингвистический центр YES&GO
              </Typography>
            </Grid>
            <Grid item xs={3}>
              {isLoggedIn ? 
                <div style={{float: 'right'}}>
                  <LogoutButton />
                </div> :
                <div style={{float: 'right'}}>
                  <LoginButton />
                </div>}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
}