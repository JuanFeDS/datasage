import React from 'react';
import { Box, useTheme } from '@mui/material';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';

const MainLayout = ({ leftPanel, centerPanel, rightPanel }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          pt: '64px', // Altura del AppBar
          '& > *': {
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            boxSizing: 'border-box',
          },
        }}
      >
        {/* Panel izquierdo */}
        <Box
          sx={{
            width: '30%',
            minWidth: 300,
            maxWidth: 400,
            p: 0,
            bgcolor: 'background.paper',
            overflow: 'hidden', // importante para que el borde se respete
            borderRadius: '0px 10px 0px 0', // sin bordes redondeados aquí
        }}
        >
          {leftPanel}
        </Box>

        {/* Panel central */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            px: 1,
            py: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: '10px 10px 0px 0', // sin bordes redondeados aquí
              bgcolor: 'background.paper',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              height: '100%',
            //   maxHeight: '504px',
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowY: 'auto',
                px: 2,
                py: 1,
              }}
            >
              {centerPanel}
            </Box>

            {/* Input o control inferior */}
            <Box
              sx={{
                flexShrink: 0,
                px: 2,
                py: 1,
                borderTop: `1px solid ${theme.palette.divider}`,
                bgcolor: 'background.paper',
              }}
            >
              {/* Aquí iría el input */}
            </Box>
          </Box>
        </Box>

        {/* Panel derecho */}
        <Box
          sx={{
            width: '15%',
            minWidth: 200,
            bgcolor: 'background.paper',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            borderRadius: '10px 0px 0px 0', // sin bordes redondeados aquí
            overflow: 'hidden', // para que el borde se respete
          }}
        >
          {rightPanel}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          flexShrink: 0,
          py: 0.5,
          px: 2,
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

MainLayout.propTypes = {
  leftPanel: PropTypes.node,
  centerPanel: PropTypes.node.isRequired,
  rightPanel: PropTypes.node,
};

MainLayout.defaultProps = {
  leftPanel: null,
  rightPanel: null,
};

export default MainLayout;
