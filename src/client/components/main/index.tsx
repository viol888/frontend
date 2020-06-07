import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { Home } from '../home';
import { AboutUs } from '../about-us';
import { Users } from '../users';
import { News } from '../news';
import { Header } from '../header';
import { NoMatch } from '../../../shared/components/no-match';
import './styles.css';
import { Container, Grid } from '@material-ui/core';

export const Main = () => {
  const { path } = useRouteMatch();

  return (
    <main className="overlay">
      <Grid>
        <Header />
      </Grid>
      <Grid container spacing={0} style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Container fixed style={{ height: '100%', width: '100%' }}>
            <Switch>
              <Route exact path={path} component={Home} />
              <Route path={`${path}/about`} component={AboutUs} />
              <Route path={`${path}/teachers`} component={() => <Users roleName={'teacher'} title={'Учителя'} /> } />
              <Route path={`${path}/contacts`} component={() => <Users roleName={'contact'} title={'Контакты'} /> } />
              <Route path={`${path}/news`} component={News} />
              <Route component={NoMatch} />
            </Switch>
          </Container>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </main>
  );
}