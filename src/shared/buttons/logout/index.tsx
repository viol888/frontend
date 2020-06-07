import React from 'react';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/auth.actions';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const logOut = () => dispatch(logout());

  return (
    <Button onClick={() => logOut()}>
      <ExitToAppRoundedIcon style={{ color: 'white' }} />
    </Button>
  );
}