import React from 'react';
import { YMaps, Map as YandexMap, Placemark } from 'react-yandex-maps';
import { Paper, Typography } from '@material-ui/core';

export const Map = () => (
  <div>
    <h3>Как добраться?</h3>
    <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>
      Наш адрес
    </Typography>
    <Typography variant="subtitle1">
      Екатеринбург, ул. Малышева, 28
    </Typography>
    <Typography variant="subtitle1" style={{fontWeight: 'bold'}}>
      Время работы
    </Typography>
    <Typography variant="subtitle1">
      <tr>
        Пн-Пт: 09:00-18:00
      </tr>
      <tr>
        Сб-Вс: выходной
      </tr>
      <tr>
        Телефон: +12015553131
      </tr>
      <tr>
        Электронная почта: contact@yesngo.com
      </tr>
    </Typography>
    <Paper>
      <YMaps>
        <YandexMap width={720} height={300} defaultState={{ center: [56.833125, 60.593887], zoom: 14 }}>
          <Placemark geometry={[56.833125, 60.593887]} />
        </YandexMap>
      </YMaps>
    </Paper>
  </div>
);