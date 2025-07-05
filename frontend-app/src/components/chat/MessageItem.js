import React from 'react';
import { ListItem, ListItemAvatar, Avatar, Typography, Box } from '@mui/material';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

const MessageItem = ({ message, mode }) => {
  const isUser = message.sender === 'user';
  
  return (
    <ListItem 
      sx={{
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
        mb: 1,
        px: 0
      }}
    >
      <ListItemAvatar sx={{ minWidth: 40 }}>
        <Avatar 
          sx={{ 
            bgcolor: isUser ? 'primary.main' : 'grey.500',
            width: 32,
            height: 32
          }}
        >
          {isUser ? (
            <PersonOutlineIcon fontSize="small" />
          ) : (
            <SmartToyOutlinedIcon fontSize="small" />
          )}
        </Avatar>
      </ListItemAvatar>
      <Box
        sx={{
          maxWidth: '70%',
          bgcolor: isUser 
            ? 'primary.main' 
            : mode === 'dark' ? 'grey.800' : 'grey.100',
          color: isUser 
            ? 'primary.contrastText' 
            : 'text.primary',
          p: 1.5,
          borderRadius: 2,
          ...(isUser 
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
            color: isUser ? 'primary.contrastText' : 'text.secondary'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default MessageItem;
