import React, { useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Paper, Typography, Divider, Toolbar } from '@material-ui/core';
import { IAboutUs } from '../../../shared/interfaces/models/about-us.interface';
import { IStore } from '../../../redux/interfaces/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { getCrudData } from '../../../redux/actions/crud.actions';
import './styles.css';

const Item = (props: IAboutUs) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText primary={props.paragraph} />
    </ListItem>
  );
}

export const AboutUs = () => {
  const dispatch = useDispatch();
  const { paragraphs } = useSelector((state: IStore) => ({
    paragraphs: state.crud['about'] as IAboutUs[]
  }));


  useEffect(() => {
    dispatch(getCrudData(`about`));
  }, [dispatch]);

  return (
    <Paper elevation={3} style={{ overflow: 'auto'}}>
      <Container fixed style={{height: '80vh'}}>
        <Toolbar style={{ backgroundColor: "white"}}>
          <Typography variant="h6">
            О нас
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {paragraphs && paragraphs.map((item, index) => (
            <Item key={index} id={item.id} order={item.order} paragraph={item.paragraph} />
          ))}
        </List>
      </Container>
    </Paper>
  );
}