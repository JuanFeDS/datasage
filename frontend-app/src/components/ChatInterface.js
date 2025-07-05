import React, { useState, useEffect } from 'react';
import { Box, Paper } from '@mui/material';
import { sendMessage, checkBackendConnection } from '../services/api';
import MessageList from './chat/MessageList';
import MessageInput from './chat/MessageInput';
import ConnectionStatus from './chat/ConnectionStatus';

const ChatInterface = ({ mode }) => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?', 
      sender: 'ai',
      timestamp: new Date(),
      isFavorite: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = await checkBackendConnection();
        setIsBackendConnected(connected);
      } catch (error) {
        console.error('Error checking backend connection:', error);
        setIsBackendConnected(false);
      }
    };
    
    checkConnection();
  }, []);

  const handleToggleFavorite = (messageId) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId 
          ? { ...msg, isFavorite: !msg.isFavorite }
          : msg
      )
    );
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading || !isBackendConnected) return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      isFavorite: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Enviar mensaje al backend
      const response = await sendMessage(inputValue, conversationId);
      
      // Actualizar el ID de conversación si es la primera vez
      if (response.conversation_id && !conversationId) {
        setConversationId(response.conversation_id);
      }

      // Agregar respuesta del asistente
      const botResponse = {
        id: Date.now() + 1,
        text: response.response || 'No se pudo obtener una respuesta del asistente.',
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      // El manejo de errores ahora está en el componente ConnectionStatus
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      bgcolor: mode === 'dark' ? 'background.default' : 'background.paper',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3,
      position: 'relative'
    }}>
      <ConnectionStatus isConnected={isBackendConnected} />
      
      <Paper 
        elevation={mode === 'dark' ? 0 : 2} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          bgcolor: 'background.paper',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          flex: 1
        }}
      >
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          mode={mode}
          onToggleFavorite={handleToggleFavorite}
        />
      </Paper>
      
      <MessageInput 
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        mode={mode}
      />
    </Box>
  );
};

export default ChatInterface;
