import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Typography,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const ChatInterface = ({ mode }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?', 
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Aquí iría la llamada a tu API del agente de IA
      // Por ahora, simulamos una respuesta después de un delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse = {
        id: messages.length + 2,
        text: `Recibí tu mensaje: "${inputValue}". Esta es una respuesta simulada.`,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error al obtener respuesta del asistente:', error);
      
      const errorMessage = {
        id: messages.length + 2,
        text: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Paper 
      elevation={mode === 'dark' ? 0 : 2} 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        maxHeight: 'calc(100vh - 200px)',
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none'
      }}
    >
      <Box 
        sx={{ 
          flexGrow: 1, 
          p: 2, 
          overflowY: 'auto',
          bgcolor: 'background.paper'
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem 
              key={message.id} 
              sx={{
                flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                mb: 1
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.500',
                    width: 32,
                    height: 32
                  }}
                >
                  {message.sender === 'user' ? (
                    <PersonOutlineIcon fontSize="small" />
                  ) : (
                    <SmartToyOutlinedIcon fontSize="small" />
                  )}
                </Avatar>
              </ListItemAvatar>
              <Box
                sx={{
                  maxWidth: '70%',
                  bgcolor: message.sender === 'user' 
                    ? 'primary.main' 
                    : mode === 'dark' ? 'grey.800' : 'grey.100',
                  color: message.sender === 'user' 
                    ? 'primary.contrastText' 
                    : 'text.primary',
                  p: 1.5,
                  borderRadius: 2,
                  ...(message.sender === 'user' 
                    ? { borderTopRightRadius: 4 } 
                    : { borderTopLeftRadius: 4 }
                  ),
                }}
              >
                <Typography variant="body1">{message.text}</Typography>
                <Typography 
                  variant="caption" 
                  display="block" 
                  textAlign="right"
                  sx={{ 
                    opacity: 0.7,
                    mt: 0.5,
                    color: message.sender === 'user' ? 'primary.contrastText' : 'text.secondary'
                  }}
                >
                  {formatTime(message.timestamp)}
                </Typography>
              </Box>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 6 }}>
                <CircularProgress 
                  size={24} 
                  sx={{ 
                    mr: 1, 
                    color: mode === 'dark' ? 'grey.400' : 'inherit' 
                  }} 
                />
                <Typography 
                  variant="body2" 
                  color={mode === 'dark' ? 'grey.400' : 'text.secondary'}
                >
                  Escribiendo...
                </Typography>
              </Box>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>
      
      <Box 
        component="form" 
        onSubmit={handleSendMessage}
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
            onChange={(e) => setInputValue(e.target.value)}
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
            color="primary" 
            disabled={!inputValue.trim() || isLoading}
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              '&:disabled': {
                bgcolor: 'action.disabledBackground',
                color: 'action.disabled',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ChatInterface;
