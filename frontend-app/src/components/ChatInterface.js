import React, { useState, useEffect, useCallback } from 'react';
import { Box, Paper } from '@mui/material';
import { sendMessage, checkBackendConnection } from '../services/api';
import MessageList from './chat/MessageList';
import MessageInput from './chat/MessageInput';
import ConnectionStatus from './chat/ConnectionStatus';

const initialMessages = [{
  id: 1,
  text: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
  sender: 'ai',
  timestamp: new Date(),
  isFavorite: false
}];

const ChatInterface = ({ mode }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(true);

  // Verificar conexión al inicio
  useEffect(() => {
    checkBackendConnection()
      .then(setIsBackendConnected)
      .catch(() => setIsBackendConnected(false));
  }, []);

  const handleToggleFavorite = useCallback((messageId) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isFavorite: !msg.isFavorite } : msg
    ));
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      isFavorite: false
    };

    // Agregar el mensaje del usuario al chat
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Enviar mensaje al backend
      const response = await sendMessage(inputValue, conversationId);
      
      // Crear mensaje de respuesta del asistente
      const aiMessage = {
        id: Date.now() + 1,
        text: response.content || 'No se pudo obtener una respuesta del asistente.',
        sender: 'ai',
        timestamp: new Date(),
        isFavorite: false
      };
      
      // Actualizar el ID de conversación si se recibe uno nuevo
      if (response.conversation_id && response.conversation_id !== conversationId) {
        setConversationId(response.conversation_id);
      }
      
      // Agregar la respuesta del asistente al chat
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      // Mostrar mensaje de error
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message || 'No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.'}`,
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const paperStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderRadius: 2,
    overflow: 'hidden',
    bgcolor: 'background.paper',
    border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
    flex: 1
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

      <Paper elevation={mode === 'dark' ? 0 : 2} sx={paperStyles}>
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
