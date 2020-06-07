import React from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IStore } from '../../../redux/interfaces/store/store';

export const LoadingScreen = () => {
  const { isLoading } = useSelector((state: IStore) => ({
    isLoading: state.dataFetch.isLoading
  }));

  return (
    <Backdrop open={isLoading} style={{zIndex: 10000}}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}