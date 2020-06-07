import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Home } from '../home';
import { Header } from '../header';
import { Login } from '../../../shared/components/login';
import { NoMatch } from '../../../shared/components/no-match';
import { News } from '../news';
import { useSelector } from 'react-redux';
import { IStore } from '../../../redux/interfaces/store/store';
import { Users } from '../users';
import { AboutUs } from '../aboutUs';
import { Grid, Container } from '@material-ui/core';

export const Main = () => {
  const { path } = useRouteMatch();
  const history = useHistory();
  const { auth } = useSelector((state: IStore) => ({
    auth: state.auth
  }));

  useEffect(() => {
    if (auth.isCheckCompleted && auth.isLoggedIn && !auth.isAdmin) {
      history.push('/home');
    } else if (auth.isCheckCompleted && !auth.isLoggedIn) {
      history.push('/login');
    }
  }, [auth, history]);

  return (
    <main>
      <Grid>
        <Header />
      </Grid>
      <Grid container spacing={0} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Container fixed style={{ height: '100%', width: '100%' }}>
            <Switch>
              <Route exact path={path} component={Home} />
              <Route path={`${path}/news`} component={News} />
              <Route path={`${path}/users`} component={Users} />
              <Route path={`${path}/about`} component={AboutUs} />
              <Route path={`${path}/login`} component={Login} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </main>
  );
}