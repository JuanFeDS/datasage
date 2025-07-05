import React from 'react';
import { Box, Typography } from '@mui/material';

const ConnectionStatus = ({ isConnected }) => {
  if (isConnected) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bgcolor: 'error.main',
        color: 'white',
        p: 1,
        textAlign: 'center',
        zIndex: 1000
      }}
    >
      <Typography variant="caption">
        No se pudo conectar con el servidor. Asegúrate de que el backend esté en ejecución.
      </Typography>
    </Box>
  );
};

export default ConnectionStatus;
