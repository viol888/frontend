import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Feedback } from '../../components/feedback';

export const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Feedback
      </Button>
      <Feedback open={open} handleClose={handleClose}/>
    </div>
  );
}