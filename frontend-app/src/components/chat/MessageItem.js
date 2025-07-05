import React, { useState } from 'react';
import { 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  Typography, 
  Box, 
  IconButton,
  Tooltip
} from '@mui/material';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const MessageItem = ({ message, mode, onToggleFavorite }) => {
  const isUser = message.sender === 'user';
  const [isHovered, setIsHovered] = useState(false);
  
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
            bgcolor: isUser ? 'primary.main' : '#C03028', // Rojo carmesí para el asistente
            width: 32,
            height: 32,
            '& .MuiSvgIcon-root': {
              color: 'white'
            }
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
        onMouseEnter={() => !isUser && setIsHovered(true)}
        onMouseLeave={() => !isUser && setIsHovered(false)}
        sx={{
          position: 'relative',
          maxWidth: '70%',
          ml: isUser ? 0 : 1,  // 8px de margen a la izquierda para mensajes del asistente
          mr: isUser ? 1 : 0,  // 8px de margen a la derecha para mensajes del usuario
          bgcolor: isUser 
            ? 'primary.main' 
            : mode === 'dark' ? 'rgba(192, 48, 40, 0.9)' : 'rgba(192, 48, 40, 0.1)', // Rojo carmesí con 90% de transparencia en modo oscuro, 10% en modo claro
          color: isUser 
            ? 'primary.contrastText' 
            : 'text.primary',
          p: 1.5,
          pr: isUser ? 1.5 : 4, // Más espacio a la derecha para el botón de favorito
          borderRadius: 2,
          ...(isUser 
            ? { borderTopRightRadius: 4 } 
            : { borderTopLeftRadius: 4 }
          ),
        }}
      >
        <Typography variant="body1">{message.text}</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
          {!isUser && (
            <Tooltip title={message.isFavorite ? "Quitar de favoritos" : "Marcar como favorito"}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite && onToggleFavorite(message.id);
                }}
                sx={{
                  position: 'absolute',
                  right: 4,
                  top: 4,
                  opacity: isHovered || message.isFavorite ? 1 : 0,
                  transition: 'all 0.2s ease-in-out',
                  color: message.isFavorite ? '#FFA500' : 'rgba(0, 0, 0, 0.5)',
                  '&:hover': {
                    color: message.isFavorite ? '#FF8C00' : '#FFA500',
                    bgcolor: 'rgba(0, 0, 0, 0.05)',
                    transform: 'scale(1.2)'
                  },
                  '&.MuiIconButton-root': {
                    padding: '4px'
                  }
                }}
              >
                {message.isFavorite ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          )}
          <Typography 
            variant="caption" 
            sx={{ 
              opacity: 0.7,
              color: isUser ? 'primary.contrastText' : 'text.secondary',
              ml: 'auto',
              display: 'block'
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

export default MessageItem;
