import React, { useEffect } from 'react';
import { Container, List, ListItem, ListItemText, Typography, Paper, Divider, Toolbar } from '@material-ui/core';
import { INews } from '../../../shared/interfaces/models/news.interface';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../redux/interfaces/store/store';
import { getCrudData } from '../../../redux/actions/crud.actions';
import './styles.css'


const renderNewsText = (text: string) => {
  return text.split('<br/>').map(i => 
    <div>
      {i}
      <br />
    </div>
  );
};

const NewsItem = (props: INews) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
          primary={props.title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                {"Описание: "}
              </Typography>
              {renderNewsText(props.description)}
            </React.Fragment>
          }
        />
    </ListItem>
  );
}

export const News = () => {
  const dispatch = useDispatch();
  const { news } = useSelector((state: IStore) => ({
    news: state.crud['news'] as INews[]
  }));


  useEffect(() => {
    dispatch(getCrudData(`news`));
  }, [dispatch]);
  return (
    <Paper elevation={3} style={{ overflow: 'auto'}}>
      <Container fixed style={{height: '80vh'}}>
        <Toolbar style={{ backgroundColor: "white"}}>
          <Typography variant="h6">
            Новости
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {news && news.map((newsItem, index) => (
            <NewsItem key={index} id={newsItem.id} title={newsItem.title} description={newsItem.description} />
          ))}
        </List>
      </Container>
    </Paper>
  );
}