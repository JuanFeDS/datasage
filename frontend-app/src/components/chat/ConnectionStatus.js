import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade, Snackbar, Alert } from '@mui/material';

const ConnectionStatus = ({ isConnected }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('info');

  useEffect(() => {
    if (isConnected !== null) {
      setOpen(true);
      if (isConnected) {
        setMessage('Conectado al servidor');
        setSeverity('success');
      } else {
        setMessage('Error de conexión con el servidor');
        setSeverity('error');
      }
    }
  }, [isConnected]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={isConnected ? 3000 : null}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ mt: 6 }}
    >
      <Alert 
        onClose={handleClose} 
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ConnectionStatus;
