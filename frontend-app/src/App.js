import { useState, useMemo } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container, 
  Box, 
  Typography, 
  IconButton,
  Tooltip
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import ChatInterface from './components/ChatInterface';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Configuración del tema claro
          primary: {
            main: '#1976d2',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.6)',
          },
        }
      : {
          // Configuración del tema oscuro
          primary: {
            main: '#90caf9',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
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
      <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box 
          sx={{ 
            py: 3, 
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <Tooltip title={`Cambiar a tema ${mode === 'light' ? 'oscuro' : 'claro'}`}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              sx={{
                position: 'absolute',
                right: 16,
                top: 16,
                color: 'text.primary',
              }}
            >
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <Typography variant="h4" component="h1" color="primary">
            Datasage AI Assistant
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Pregúntame lo que necesites
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <ChatInterface mode={mode} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
