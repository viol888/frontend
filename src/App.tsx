import React, { useEffect } from 'react';
import { Main as AdminApp } from './admin/components/main';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { NoMatch } from './shared/components/no-match';
import { useDispatch } from 'react-redux';
import { checkLogin } from './redux/actions/auth.actions';
import { Login } from './shared/components/login';
import { InfoMessage } from './shared/components/info-message';
import { LoadingScreen } from './shared/components/loading-screen';

const HomeRedirect = () => <Redirect to="/home" />

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch])

  return (
    <div>
      <Router>
        <Switch >
          <Route path='/' exact component={HomeRedirect} />
          <Route path="/home" component={AdminApp} />
          <Route path='/login' component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
      <InfoMessage />
      <LoadingScreen />
    </div>
  );
}
