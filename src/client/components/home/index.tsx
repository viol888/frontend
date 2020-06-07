import React, { useState } from 'react';
import { Container, Typography, Grid, GridList, GridListTile, Card, CardContent, Chip, Paper, Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core';
import './styles.css'

export const Home = () => {

  const data = [
    {
      index: 0,
      title: 'Английский язык для детей — это весело!',
      text: 'Английский язык для детей дошкольного возраста — это возможно? Бесспорно, да. Ведь ребенок, как никто другой, способен запоминать значительные объемы новой информации. Самое главное в обучении — это суметь вовлечь малыша в мир иностранных языков, заинтересовать его, сделать занятия максимально увлекательными.'
    },
    {
      index: 1,
      title: 'Деловой английский',
      text: 'Деловой английский язык для специальных задач – English for Special Purposes. Это наша особая гордость: выясняем вашу бизнес-задачу и подбираем или разрабатываем курс, который помогает решить именно ее. Например, ваша компания хочет принять участие в международном тендере. Для этого надо выстроить бизнес-процесс на английском: правильно оформить документацию, сделать презентацию компании и научить сотрудников говорить о продукте. Мы разрабатываем курс, который работает на эти задачи. Не только учим деловому английскому, но и анализируем весь бизнес-процесс.',
    },
    {
      index: 2,
      title: 'Английский язык для взрослых',
      text: 'У некоторых может возникнуть вопрос: «Зачем?». Отвечаем: раньше английский мог понадобиться только путешественникам или переводчикам, но на данный момент без знания языка трудно научиться работать за компьютером, устроится на высокооплачиваемую должность, прочитать инструкцию к бытовой технике и т.д. Поэтому английский, собственно, просто необходим для оформления счастливого будущего, и начать учить его никогда не поздно.'
    },
    {
      index: 3,
      title: 'Обучение за рубежом',
      text: 'Обучение английскому за рубежом кардинально отличается от обычной турпоездки. В отличие от последней оно способствует не только расширению кругозора, но и вашему профессиональному росту. При этом цены обучения за рубежом вполне сопоставимы с туристической поездкой. Занятия иностранным по интенсивной программе среди носителей языка в 3 раза эффективнее посещения аналогичных курсов в России. К тому же обучение за границей способствует легкому усвоению разговорной речи и ее быстрому восприятию на слух.'
    }
  ]

  const [isOpen, setOpen] = useState(false);
  const [openedInfo, selectInfo] = useState({title: '', text: ''});

  const handleClickOpen = (index: number) => {
    selectInfo(data.find(i => i.index === index) || {title: '', text: ''});
    setOpen(true);
  };

  const handleClose = () => {
    selectInfo({title: '', text: ''});
    setOpen(false);
  };

  return (
    <div>
      <Paper elevation={3} style={{ overflow: 'auto', height: '87vh'}}>
        <Container fixed style={{marginTop: '3vh'}}>
          <Typography component="div" >
            <Grid>
              <GridList cols={9} cellHeight={'auto'} >
                <GridListTile cols={5}>
                  <Card className='img-child' onClick={() => handleClickOpen(0)}>
                    <CardContent>
                      <Chip color="primary" label="Обучение для детей" style={{ backgroundColor: "#2196f3" }} />
                    </CardContent>
                  </Card>
                </GridListTile>
                <GridListTile cols={4}>
                  <Card className='img-adult' onClick={() => handleClickOpen(2)}>
                    <CardContent>
                      <Chip color="primary" label="Обучение для взрослых" style={{ backgroundColor: "#2196f3" }} />
                    </CardContent>
                  </Card>
                </GridListTile>
                <GridListTile cols={4}>
                  <Card className='img-abroad' onClick={() => handleClickOpen(3)}>
                    <CardContent>
                      <Chip color="primary" label="Обучение за рубежом" style={{ backgroundColor: "#2196f3" }} />
                    </CardContent>
                  </Card>
                </GridListTile>
                <GridListTile cols={5}>
                  <Card className='img-group' onClick={() => handleClickOpen(1)}>
                    <CardContent>
                      <Chip color="primary" label="Корпоративное обучение" style={{ backgroundColor: "#2196f3" }} />
                    </CardContent>
                  </Card>
                </GridListTile>
              </GridList>
            </Grid>
          </Typography>
        </Container>
      </Paper>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle id="simple-dialog-title">{openedInfo.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {openedInfo.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};