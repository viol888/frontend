import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IStore } from '../../../redux/interfaces/store/store';
import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ActionTypes } from '../../../redux/actions-types';

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const InfoMessage = () => {
  const dispatch = useDispatch();
  const { dataFetch } = useSelector((state: IStore) => ({
    dataFetch: state.dataFetch
  }));

  const handleClose = () => {
    dispatch({
      type: ActionTypes.DATA_FETCH_CLEAR_MESSAGE
    });
  }

  return (
    <Snackbar open={!!dataFetch.message} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={dataFetch.isError ? 'error': 'success' }>
        {dataFetch.message}
      </Alert>
    </Snackbar>
  );
}