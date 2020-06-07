import React from 'react';
import { TextField, Dialog, DialogTitle, DialogContent, ListItem, List, ButtonGroup, Grid, Tooltip, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../redux/actions/auth.actions';
import { IStore } from '../../../redux/interfaces/store/store';
import { useHistory } from 'react-router-dom';
import { IRegister } from '../../interfaces/register.interface';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

export const Register = () => {
  const initialValues: IRegister = {
    email: '',
    password: '',
    phone: '',
    name: ''
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector((state: IStore) => ({
    isLoggedIn: state.auth.isLoggedIn
  }));

  if (isLoggedIn) {
    if (history.length > 2) {
      history.goBack();
    } else {
      history.push('/home');
    }
  }

  const toLogin = () => history.push('/login');
  const toHomePage = () => history.push('/home');

  const handleSubmit = (formData: IRegister) => {
    dispatch(register(formData));
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
      <DialogTitle>Регистрация</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <List>
            <ListItem>
              <TextField key="email" placeholder="Почта" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} required/>
            </ListItem>
            <ListItem>
              <TextField key="password" placeholder="Пароль" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} required/>
            </ListItem>
            <ListItem>
              <TextField key="phone" placeholder="Телефон" type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} required/>
            </ListItem>
            <ListItem>
              <TextField key="name" placeholder="Имя" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} required/>
            </ListItem>
            <ListItem >
              <Grid container justify="center">
                <ButtonGroup variant="text" color="primary">
                  <Tooltip title="Зарегистрироваться">
                    <Button type="submit">
                      <CheckRoundedIcon />
                    </Button >
                  </Tooltip>
                  <Tooltip title="Домой">
                    <Button type="button" onClick={() => toHomePage()}>
                      <HomeRoundedIcon />
                    </Button >
                  </Tooltip>
                  <Tooltip title="К логину">
                    <Button type="button" onClick={() => toLogin()}>
                      <VpnKeyIcon />
                    </Button >
                  </Tooltip>
                </ButtonGroup>
              </Grid>
            </ListItem>
          </List>
        </form>
      </DialogContent>
    </Dialog>
  );
};