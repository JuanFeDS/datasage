import { useState, useMemo } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Box, 
  Typography, 
  IconButton,
  Tooltip,
  AppBar,
  Toolbar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { 
  Brightness4, 
  Brightness7, 
  Inbox as InboxIcon,
  Star as StarIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon
} from '@mui/icons-material';
import ChatInterface from './components/ChatInterface';
import MainLayout from './layouts/MainLayout';


const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Tema Sage Mode de Naruto mejorado
          primary: {
            main: '#2E8B57',  // Verde más brillante y vibrante
            light: '#3CB371', // Verde más claro
            dark: '#1E5C3A',  // Verde más oscuro
            contrastText: '#FFFFFF',  // Texto blanco para mejor contraste
          },
          secondary: {
            main: '#F2B705',  // Amarillo Ámbar - Energía del modo sabio
            light: '#F9D54F', // Amarillo más brillante para acentos
            dark: '#D4A005',  // Amarillo más oscuro para profundidad
            contrastText: '#1D1D1D',
          },
          error: {
            main: '#C03028',  // Rojo Sapo - Para elementos de error o advertencia
            light: '#D94E48',
            dark: '#9B2620',
            contrastText: '#FFFFFF',
          },
          warning: {
            main: '#F26924',  // Naranja Myōboku - Para advertencias
            light: '#F58A56',
            dark: '#D9531A',
            contrastText: '#1D1D1D',
          },
          info: {
            main: '#6D3E89',  // Púrpura Chakra - Para información
            light: '#8B5DA3',
            dark: '#552D6F',
            contrastText: '#FFFFFF',
          },
          success: {
            main: '#3D6B4A',  // Verde Sabio para éxito
            light: '#4F8B5A',
            dark: '#2C4D36',
            contrastText: '#F2F2E9',
          },
          background: {
            default: '#F5F2E9',  // Fondo crema suave como pergamino antiguo
            paper: '#FFFFFF',     // Blanco para superficies elevadas
            defaultChannel: '245 242 233', // Para compatibilidad con MUI
          },
          text: {
            primary: '#2C3E36',  // Casi negro con tono verde
            secondary: '#3D6B4A', // Verde sabio para texto secundario
            disabled: '#A4A7A5',  // Gris Monte Myōboku
            hint: '#6D3E89',      // Púrpura para texto de ayuda
          },
          action: {
            active: '#3D6B4A',    // Verde sabio para elementos activos
            hover: 'rgba(61, 107, 74, 0.08)',  // Verde muy transparente
            selected: 'rgba(61, 107, 74, 0.12)',
            disabled: 'rgba(0, 0, 0, 0.26)',
            disabledBackground: 'rgba(0, 0, 0, 0.12)',
          },
          divider: 'rgba(0, 0, 0, 0.12)',
        }
      : {
          // Configuración del tema oscuro - Tema Sage Mode
          primary: {
            main: '#6BBF59',  // Verde claro para el modo oscuro
            light: '#8ED87F', // Verde más claro para hover/estados
            dark: '#4A8D3A',  // Verde más oscuro para profundidad
            contrastText: '#1D1D1D',  // Texto oscuro para mejor contraste
          },
          secondary: {
            main: '#F2B705',  // Amarillo Ámbar - Energía del modo sabio
            light: '#F9D54F',
            dark: '#D4A005',
            contrastText: '#1D1D1D',
          },
          error: {
            main: '#E57373',  // Rojo más suave para el modo oscuro
            contrastText: '#1D1D1D',
          },
          warning: {
            main: '#FFB74D',  // Naranja más suave
            contrastText: '#1D1D1D',
          },
          info: {
            main: '#64B5F6',  // Azul claro para información
            contrastText: '#1D1D1D',
          },
          success: {
            main: '#81C784',  // Verde éxito más suave
            contrastText: '#1D1D1D',
          },
          background: {
            default: '#121212',
            paper: '#1E1E1E',
            defaultChannel: '18 18 18',
          },
          text: {
            primary: '#F5F5F5',  // Blanco roto para mejor legibilidad
            secondary: '#B0BEC5', // Gris azulado para texto secundario
            disabled: '#616161',
            hint: '#90A4AE',
          },
          action: {
            active: '#6BBF59',    // Verde claro para elementos activos
            hover: 'rgba(107, 191, 89, 0.08)',
            selected: 'rgba(107, 191, 89, 0.16)',
            disabled: 'rgba(255, 255, 255, 0.3)',
            disabledBackground: 'rgba(255, 255, 255, 0.12)',
          },
        }),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  const [mode, setMode] = useState('light');
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar 
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: (theme) => 
            theme.palette.mode === 'dark' 
              ? 'rgba(30, 30, 30, 0.9)' // Color oscuro con transparencia
              : `${theme.palette.primary.main}E6`, // Color primario con transparencia
          backdropFilter: 'blur(8px)',
          boxShadow: 'none',
          borderBottom: (theme) => 
            `1px solid ${theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.12)' 
              : 'rgba(0, 0, 0, 0.12)'}`,
          '& .MuiToolbar-root': {
            minHeight: '56px',
            height: '56px',
            padding: '0 16px',
            margin: 0
          }
        }}
      >
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box component="span" sx={{ fontSize: 28, lineHeight: 1, mr: 1 }}>🐸</Box>
            <Typography 
              variant="h6" 
              component="h1" 
              sx={{
                fontWeight: 800,
                color: 'white',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                letterSpacing: '0.5px',
              }}
            >
              DataSage
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title={`Cambiar a tema ${mode === 'light' ? 'oscuro' : 'claro'}`}>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{
                  ml: 1,
                  color: '#1D1D1D',
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      <MainLayout
        leftPanel={
          <Box>
            <Typography variant="h6" gutterBottom>
              Conversaciones
            </Typography>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Bandeja de entrada" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Destacados" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Enviados" />
              </ListItem>
            </List>
          </Box>
        }
        centerPanel={
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ChatInterface mode={mode} />
          </Box>
        }
        rightPanel={
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Información
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Panel derecho para información adicional o controles.
            </Typography>
          </Box>
        }
      />
    </ThemeProvider>
  );
}

export default App;
