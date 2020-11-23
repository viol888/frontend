import React, { useEffect } from 'react';
import MaterialTable, { Column, Localization } from 'material-table';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../../redux/interfaces/store/store';
import { IInfo } from '../../../shared/interfaces/models/info.interface';
import { addCrudData, deleteCrudData, getCrudData, updateCrudData } from '../../../redux/actions/crud.actions';
import { IContact } from '../../../shared/interfaces/models/contact.interface';
import moment from 'moment';
import ruLocale from 'date-fns/locale/ru';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { IWorker } from '../../../shared/interfaces/models/worker.interface';

const localizationSetup: Localization = {
  header: {
    actions: 'Действия',
  },
  toolbar: {
    searchPlaceholder: 'Поиск',
    searchTooltip: 'Поиск'
  },
  body: {
    addTooltip: 'Добавить',
    editTooltip: 'Редактировать',
    deleteTooltip: 'Удалить',
    editRow: {
      saveTooltip: 'Сохранить',
      cancelTooltip: 'Отменить',
      deleteText: 'Удалить запись?'
    },
    dateTimePickerLocalization: ruLocale
  },
  pagination: {
    labelDisplayedRows: '{from}-{to} из {count}',
    labelRowsSelect: 'записей',
    labelRowsPerPage: 'Записи на странице',
    firstAriaLabel: 'Первая страница',
    firstTooltip: 'Первая страница',
    previousAriaLabel: 'Предыдущая страница',
    previousTooltip: 'Предыдущая страница',
    nextAriaLabel: 'Следующая страница',
    nextTooltip: 'Следующая страница',
    lastAriaLabel: 'Последняя страница',
    lastTooltip: 'Последняя страница'
  },
};

const ContactStaticTable = (props: { infoId: string, defaultData: IContact[] }) => {
  const collectionName = 'contact';

  const { infoId, defaultData } = props;
  const { data } = useSelector((state: IStore) => ({
    data: (state.crud[collectionName] as IContact[])?.filter(i => i.info === infoId)
  }));
  return (
    <table>
      <tbody>
        <tr>
          <th>ФИО</th>
          <th>Дата рождения</th>
        </tr>
        {(data || defaultData)?.map((contact, key) => <tr key={key}><td>{contact.fio}</td><td>{moment(contact.birthDay).format('DD/MM/YYYY')}</td></tr>)}
      </tbody>
    </table>
  );
};

const ContactsTable = (props: { infoId: string, data: IContact[] }) => {
  const collectionName = 'contact';
  const dispatch = useDispatch();
  const { infoId } = props;

  const { data } = useSelector((state: IStore) => ({
    data: (state.crud[collectionName] as IContact[])?.filter(i => i.info === infoId)
  }));

  const columns: Column<IContact>[] = [
    { title: 'ФИО', field: 'fio' },
    {
      title: 'Дата рождения',
      field: 'birthDay',
      type: 'date',
      render: rowData => <div>{moment(rowData.birthDay).format('DD/MM/YYYY')}</div>,
      editComponent: props => 
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale} >
            <DatePicker
              value={props.rowData.birthDay || null}
              okLabel={'Ок'}
              cancelLabel={'Отмена'}
              format={'dd/MM/yyyy'}
              onChange={(date) => props.onChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
    }
  ];

  return (
    <MaterialTable
      localization={localizationSetup}
      options={{search: false, paginationType: 'normal'}}
      title={' '}
      columns={columns}
      data={data || props.data}
      editable={{
        onRowAdd: newData => new Promise(resolve => {
          resolve();
          newData.info = infoId;
          dispatch(addCrudData(collectionName, newData));
        }),
        onRowUpdate: (newData, oldData) => new Promise(resolve => {
          resolve();
          if (oldData) {
            dispatch(updateCrudData(collectionName, newData));
          }
        }),
        onRowDelete: oldData => new Promise(resolve => {
          resolve();
          dispatch(deleteCrudData(collectionName, oldData.id));
        })
      }}
    />
  );
}

export const Table = () => {
  const collectionName = 'info';
  const dispatch = useDispatch();
  const { data } = useSelector((state: IStore) => ({
    data: state.crud[collectionName] as IInfo[]
  }));

  useEffect(() => {
    dispatch(getCrudData(collectionName));
  }, [collectionName, dispatch])

  const columns: Column<IInfo>[] = [
    { title: 'ФИО', field: 'fio' },
    { 
      title: 'Начало пребывания',
      field: 'stayDateStart',
      type: 'date',
      render: rowData => <div>{moment(rowData.stayDateStart).format('DD/MM/YYYY')}</div>,
      editComponent: props => 
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale} >
            <DatePicker
              value={props.rowData.stayDateStart || null}
              okLabel={'Ок'}
              cancelLabel={'Отмена'}
              format={'dd/MM/yyyy'}
              onChange={(date) => props.onChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
    },
    {
      title: 'Конец пребывания',
      field: 'stayDateEnd',
      type: 'date',
      render: rowData => <div>{moment(rowData.stayDateEnd).format('DD/MM/YYYY')}</div>,
      editComponent: props => 
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale} >
            <DatePicker
              value={props.rowData.stayDateEnd || null}
              okLabel={'Ок'}
              cancelLabel={'Отмена'}
              format={'dd/MM/yyyy'}
              onChange={(date) => props.onChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
    },
    { title: 'Отделение', field: 'department' },
    { 
      title: 'Список контактных пациентов',
      field: 'contacts',
      sorting: false,
      render: (rowData) => <ContactStaticTable infoId={rowData.id} defaultData={rowData.contactList || []}/>,
      editComponent: props => <div> {props.rowData.id && <ContactsTable infoId={props.rowData.id} data={props.rowData.contactList || []}/> }</div>
    }
  ];
  return (
    <MaterialTable
      localization={localizationSetup}
      options={{search: false, paginationType: 'normal'}}
      title={'Список пациентов стационара с положительным результатом ПЦР на коронавирусную инфекцию за 2020 год'}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData => new Promise(resolve => {
          resolve();
          delete newData.contactList;
          dispatch(addCrudData(collectionName, newData));
        }),
        onRowUpdate: (newData, oldData) => new Promise(resolve => {
          resolve();
          if (oldData) {
            delete newData.contactList;
            dispatch(updateCrudData(collectionName, newData));
          }
        }),
        onRowDelete: oldData => new Promise(resolve => {
          resolve();
          dispatch(deleteCrudData(collectionName, oldData.id));
        })
      }}
    />
  );
};

export const WorkersTable = () => {
  const collectionName = 'worker';
  const dispatch = useDispatch();
  const { data } = useSelector((state: IStore) => ({
    data: state.crud[collectionName] as IWorker[]
  }));

  useEffect(() => {
    dispatch(getCrudData(collectionName));
  }, [collectionName, dispatch])

  const columns: Column<IWorker>[] = [
    { title: 'ФИО', field: 'fio' },
    { title: 'Должность, отделение', field: 'position' },
    { 
      title: 'Дата получения положительного результата',
      field: 'positiveResultDate',
      type: 'date',
      render: rowData => <div>{moment(rowData.positiveResultDate).format('DD/MM/YYYY')}</div>,
      editComponent: props => 
        <div>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale} >
            <DatePicker
              value={props.rowData.positiveResultDate || null}
              okLabel={'Ок'}
              cancelLabel={'Отмена'}
              format={'dd/MM/yyyy'}
              onChange={(date) => props.onChange(date)}
            />
          </MuiPickersUtilsProvider>
        </div>
    }
  ];
  return (
    <MaterialTable
      localization={localizationSetup}
      options={{search: false, paginationType: 'normal'}}
      title={'Список сотрудников с COVID-19'}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData => new Promise(resolve => {
          resolve();
          dispatch(addCrudData(collectionName, newData));
        }),
        onRowUpdate: (newData, oldData) => new Promise(resolve => {
          resolve();
          if (oldData) {
            dispatch(updateCrudData(collectionName, newData));
          }
        }),
        onRowDelete: oldData => new Promise(resolve => {
          resolve();
          dispatch(deleteCrudData(collectionName, oldData.id));
        })
      }}
    />
  );
}