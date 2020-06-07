import React, { useEffect } from 'react';
import { ListItem, ListItemAvatar, ListItemText, List, Container, Paper, Typography, Divider, Toolbar, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../../redux/interfaces/store/store';
import { IUser } from '../../../shared/interfaces/models/user.interface';
import { getCrudData } from '../../../redux/actions/crud.actions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Map } from '../map';

interface IUserProps {
  roleName: string;
  title: string;
}

const User = (props: IUser) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <AccountCircleIcon />
      </ListItemAvatar>
      <ListItemText primary={props.name} secondary={`Телефон: ${props.phone}, Почта: ${props.email}`} />
    </ListItem>
  );
}

export const Users = (props: IUserProps) => {
  const { title, roleName } = props;

  const dispatch = useDispatch();
  const { users, roles } = useSelector((state: IStore) => ({
    users: state.crud['user'] as IUser[],
    roles: state.roles.roles
  }));


  useEffect(() => {
    const roleId = roles.find(role => role.name === roleName)?.id;
    if (roleId) {
      dispatch(getCrudData(`user`, `role=${roleId}`));
    }
  }, [dispatch, roleName, roles]);

  return (
    <Paper elevation={3} style={{ overflow: 'auto'}}>
      <Container fixed style={{height: '80vh'}}>
        <Toolbar style={{ backgroundColor: "white"}}>
          <Typography variant="h6">
            {title}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {users && users.map((user, index) => (
            <User key={index} id={user.id} email={user.email} role={user.role} name={user.name} phone={user.phone} />
          ))}
        </List>
        <Grid container justify="center">
          {roleName === 'contact' && <Map />}
        </Grid>
      </Container>
    </Paper>
  );
}