import React from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, ListItem, List, ButtonGroup } from '@material-ui/core';
import { IFeedbackData } from '../../interfaces/feedback-data.interface';
import { useFormik } from 'formik';

interface IProps {
  handleClose: () => void;
  open: boolean;
}

export const Feedback = (props: IProps) => {
  const { handleClose, open } = props;

  const initialValues: IFeedbackData = {
    name: '',
    email: '',
    text: ''
  }

  const handleSubmit = (formData: IFeedbackData) => {
    console.log(formData);
    formik.resetForm();
    handleClose();
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    enableReinitialize: true
  });
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Feedback</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <List>
            <ListItem>
              <TextField key="email" placeholder="Email" type="email" name="email" value={formik.values.email} onChange={formik.handleChange} required/>
            </ListItem>
            <ListItem>
            <TextField key="name" placeholder="Name" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} required/>
          </ListItem>
          <ListItem>
            <TextField key="text" placeholder="Text" type="text" name="text" value={formik.values.text} onChange={formik.handleChange} required/>
          </ListItem>
          <ListItem alignItems="flex-start">
            <ButtonGroup variant="text" color="primary">
              <Button type="submit">Send</Button>
              <Button onClick={handleClose}>Close</Button>
            </ButtonGroup>
          </ListItem>
          </List>
        </form>
      </DialogContent>
    </Dialog>
  );
};