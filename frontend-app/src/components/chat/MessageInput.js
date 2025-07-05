import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({ 
  inputValue, 
  onInputChange, 
  onSendMessage, 
  isLoading, 
  mode 
}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={(e) => {
        e.preventDefault();
        onSendMessage();
      }}
      sx={{ 
        p: 2, 
        borderTop: '1px solid',
        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'divider',
        bgcolor: 'background.paper'
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Escribe tu mensaje..."
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              bgcolor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'background.paper',
              '& fieldset': {
                borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
              },
            },
          }}
        />
        <IconButton 
          type="submit" 
          color="success"
          disabled={!inputValue.trim() || isLoading}
          sx={{ 
            bgcolor: inputValue.trim() ? '#2E8B57' : '#3D6B4A', // Verde brillante cuando hay texto, oscuro cuando no
            color: 'white',
            '&:hover': {
              bgcolor: inputValue.trim() ? '#3CB371' : '#2E4F38', // Verde más claro al pasar el mouse
            },
            '&:disabled': {
              bgcolor: 'action.disabledBackground',
              color: 'action.disabled',
            },
            transition: 'all 0.2s ease-in-out',
            transform: inputValue.trim() ? 'scale(1.05)' : 'scale(1)', // Ligero efecto de escala cuando está activo
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageInput;
