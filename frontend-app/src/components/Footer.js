import React from 'react';
import { Box, Typography, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 1.5,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => 
          theme.palette.mode === 'dark' 
            ? 'rgba(30, 30, 30, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderTop: (theme) => 
          `1px solid ${theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.12)' 
            : 'rgba(0, 0, 0, 0.12)'}`,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '100%',
          mx: 'auto',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} DataSage
        </Typography>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
            v1.0.0
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Desarrollado con ❤️
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
