import React, { useEffect } from 'react';
import { Main as ClientApp } from './client/components/main';
import { Main as AdminApp } from './admin/components/main';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { NoMatch } from './shared/components/no-match';
import { HomeRedirect } from './shared/components/home-redirect';
import { useDispatch } from 'react-redux';
import { checkLogin } from './redux/actions/auth.actions';
import { Login } from './shared/components/login';
import { Register } from './shared/components/register';
import { getRoles } from './redux/actions/roles.actions';
import { InfoMessage } from './shared/components/info-message';
import { LoadingScreen } from './shared/components/loading-screen';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
    dispatch(getRoles());
  }, [dispatch])

  return (
    <div>
      <Router>
        <Switch >
          <Route path="/" exact component={HomeRedirect} />} />
          <Route path="/home" component={ClientApp} />
          <Route path="/admin" component={AdminApp} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <InfoMessage />
      <LoadingScreen />
    </div>
  );
}
