import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import PropTypes from 'prop-types';

const SidePanel = ({ 
  isOpen, 
  onToggle, 
  children, 
  icons = [],
  width = '30%',
  minWidth = 250,
  maxWidth = 400
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        position: 'relative',
      }}
    >
      {/* Barra lateral de iconos (siempre visible) */}
      <Box
        sx={{
          width: 56,
          height: '100%',
          bgcolor: 'background.paper',
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          gap: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {icons.map((item, index) => (
          <Tooltip key={index} title={item.text || ''} placement="right">
            <IconButton
              onClick={item.onClick}
              sx={{
                width: 40,
                height: 40,
                color: 'text.secondary',
                transition: (theme) =>
                  theme.transitions.create(
                    ['color', 'background-color', 'transform'],
                    {
                      duration: 150,
                      easing: 'ease-in-out',
                    }
                  ),
                '&:hover': {
                  color: 'primary.main',
                  transform: 'scale(1.1)',
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgba(46, 139, 87, 0.1)'
                      : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              {item.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      {/* Contenido del panel */}
      <Box
        sx={{
          width: isOpen ? `calc(${width} - 56px)` : 0,
          height: '100%',
          borderRight: (theme) => `1px solid ${theme.palette.divider}`,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          willChange: 'width',
          transition: (theme) =>
            theme.transitions.create(['width', 'opacity'], {
              duration: 300,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            }),
          minWidth: isOpen ? minWidth - 56 : 0,
          maxWidth: isOpen ? `calc(${maxWidth} - 56px)` : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <Box
          sx={{
            p: 2,
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            opacity: isOpen ? 1 : 0,
            transition: (theme) =>
              theme.transitions.create('opacity', {
                duration: 150,
                easing: 'ease-in-out',
              }),
          }}
        >
          {children}
        </Box>
      </Box>

      {/* Botón de toggle */}
      <Tooltip title={isOpen ? 'Ocultar panel' : 'Mostrar panel'} placement="right">
        <IconButton
          onClick={onToggle}
          sx={{
            position: 'absolute',
            left: isOpen ? `calc(${width} - 20px)` : 56,
            top: 70,
            zIndex: 1200,
            backgroundColor: 'background.paper',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderLeft: 'none',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            boxShadow: 2,
            transform: 'translateZ(0)',
            willChange: 'left',
            '&:hover': {
              backgroundColor: (theme) => theme.palette.action.hover,
              transform: 'translateX(2px) translateZ(0)',
            },
            transition: (theme) =>
              theme.transitions.create(
                ['left', 'transform', 'box-shadow'],
                {
                  duration: 300,
                  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                }
              ),
          }}
        >
          {isOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

SidePanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  children: PropTypes.node,
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      text: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.number,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SidePanel;
