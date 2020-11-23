import React from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, ListItem, List, ButtonGroup, Tooltip, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { ILogin } from '../../interfaces/login.interface';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/actions/auth.actions';
import { IStore } from '../../../redux/interfaces/store/store';
import { useHistory } from 'react-router-dom';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import { Grid } from '@material-ui/core';

export const Login = () => {
  const initialValues: ILogin = {
    userName: '',
    password: ''
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state: IStore) => ({
    isLoggedIn: state.auth.isLoggedIn
  }));

  if (isLoggedIn) {
    history.push('/home');
  }

  // const toRegister = () => history.push('/register');
  const toHomePage = () => history.push('/home');

  const handleSubmit = (formData: ILogin) => {
    dispatch(login(formData));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });

  return (
    <Dialog open={true} disableBackdropClick={true}>
      <DialogTitle>Логин</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <List>
            <ListItem>
              <TextField key="userName" placeholder="Имя пользователя" type="text" name="userName" value={formik.values.userName} onChange={formik.handleChange} required/>
            </ListItem>
            <ListItem>
              <TextField key="password" placeholder="Пароль" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} required/>
            </ListItem>
          <ListItem >
            <Grid container justify="center">
              <ButtonGroup variant="text" color="primary">
                <Tooltip title="Логин">
                  <Button aria-label="Логин" type="submit">
                    <CheckRoundedIcon />
                  </Button >
                </Tooltip>
                <Tooltip title="Домой">
                  <Button aria-label="Домой" type="button" onClick={() => toHomePage()}>
                    <HomeRoundedIcon />
                  </Button >
                </Tooltip>
                {/* <Tooltip title="К регистрации">
                  <Button aria-label="Регистрация" type="button" onClick={() => toRegister()}>
                    <PlusOneIcon />
                  </Button >
                </Tooltip> */}
              </ButtonGroup>
            </Grid>
          </ListItem>
          </List>
        </form>
      </DialogContent>
    </Dialog>
  );
};