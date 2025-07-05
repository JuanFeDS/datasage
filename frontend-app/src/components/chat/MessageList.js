import React from 'react';
import { List, Box, Typography, CircularProgress } from '@mui/material';
import MessageItem from './MessageItem';

const MessageList = ({ messages, isLoading, mode }) => {
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
      <List>
        {messages.map((message) => (
          <MessageItem 
            key={message.id} 
            message={message} 
            mode={mode} 
          />
        ))}
        
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 6, my: 2 }}>
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
        )}
        <div ref={messagesEndRef} />
      </List>
    </Box>
  );
};

export default MessageList;
