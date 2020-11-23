import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import { Header } from '../header';
import { NoMatch } from '../../../shared/components/no-match';
import { Table, WorkersTable } from '../table';
import { useSelector } from 'react-redux';
import { IStore } from '../../../redux/interfaces/store/store';
import { Grid } from '@material-ui/core';
import { Home } from '../home';

export const Main = () => {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { auth } = useSelector((state: IStore) => ({
    auth: state.auth
  }));

  useEffect(() => {
    if (auth.isCheckCompleted && !auth.isLoggedIn) {
      history.push('/login');
    }
  }, [auth, history]);

  return (
    <main>
      <Grid>
        <Header />
      </Grid>
      <Grid >
        <Switch>
          <Route exact path={path} component={Home} />
          <Route path={`${path}/table`} component={Table} />
          <Route path={`${path}/workers`} component={WorkersTable} />
          <Route component={NoMatch} />
        </Switch>
      </Grid>
    </main>
  );
}