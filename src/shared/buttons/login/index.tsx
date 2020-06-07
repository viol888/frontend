import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import Tooltip from '@material-ui/core/Tooltip';

export const LoginButton = () => {
  const history = useHistory();
  return (
    <Tooltip title="Логин">
      <Button onClick={() => history.push('/login')}>
        <VpnKeyRoundedIcon style={{ color: 'white' }} />
      </Button>
    </Tooltip>
  );
}