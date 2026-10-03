import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import { GlobalStyles } from './theme/globalStyles';
import { Button } from './components/common/Button';
import { Container } from './components/layout/Container';
import { Card } from './components/common/Card';
import { FileUpload } from './components/file-upload/FileUpload';
import UnivariateAnalysis from './components/univariate/UnivariateAnalysis';
import { DataType } from './components/univariate/types';
import { 
  DashboardIcon, 
  UnivariateIcon, 
  BivariateIcon, 
  ReportsIcon, 
  SettingsIcon, 
  LightbulbIcon,
  MenuIcon,
  NotificationsIcon,
  UserIcon
} from './components/icons';

type DataPoint = {
  [key: string]: string | number | Date | boolean | null;
};

// Definición de tipos
type ViewType = 'dashboard' | 'univariate' | 'bivariate' | 'reports' | 'settings' | 'preview';

interface NavItem {
  id: ViewType;
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

// Estilos con styled-components
const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(159deg, rgba(9, 9, 43, 1) 0%, rgba(47, 55, 128, 1) 50%, rgba(56, 76, 150, 1) 73%, rgba(51, 73, 171, 1) 100%);
  color: ${({ theme }) => theme.colors.gray100};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: 200px;
  background: rgba(15, 15, 60, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[2]};
  z-index: ${({ theme }) => theme.zIndices.docked};
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    box-shadow: ${({ $isOpen, theme }) => $isOpen ? theme.shadows.xl : 'none'};
    z-index: ${({ theme }) => theme.zIndices.overlay};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    position: relative;
    transform: none !important;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing[8]};
  padding: 0 ${({ theme }) => theme.spacing[2]};
  
  h1 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: 800;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-left: ${({ theme }) => theme.spacing[3]};
    margin-bottom: 0;
    line-height: 1.2;
  }
  
  svg {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
  }
`;

const Nav = styled.nav`
  flex: 1;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing[1]};
  }
  
  a {
    display: flex;
    align-items: center;
    padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
    color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radii.lg};
    text-decoration: none;
    transition: all 0.2s ease;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: ${({ theme }) => theme.colors.white};
      transform: translateX(4px);
    }
    
    &.active {
      background-color: rgba(51, 73, 171, 0.6);
      color: ${({ theme }) => theme.colors.white};
      font-weight: 600;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    svg {
      margin-right: ${({ theme }) => theme.spacing[3]};
      width: 20px;
      height: 20px;
      flex-shrink: 0;
    }
  }
`;

const MainContent = styled.main<{ $sidebarOpen: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: margin-left 0.3s ease;
  margin-left: 20px;
  padding: ${({ theme }) => theme.spacing[4]};
  min-height: 100vh;
  max-width: calc(100% - 20px);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-left: 0;
    width: 100%;
  }
`;

const TopBar = styled.header`
  height: 80px;
  background: rgba(15, 25, 70, 0.3);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  position: sticky;
  top: 16px;
  margin: 16px 16px 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  color: white;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing[4]};
    height: 70px;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.gray600};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
    color: ${({ theme }) => theme.colors.gray900};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const TopBarActions = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: ${({ theme }) => theme.spacing[3]};
  
  button {
    background: none;
    border: none;
    padding: ${({ theme }) => theme.spacing[2]};
    border-radius: ${({ theme }) => theme.radii.full};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.gray600};
    transition: all 0.2s ease;
    position: relative;
    
    &:hover {
      background-color: ${({ theme }) => theme.colors.gray100};
      color: ${({ theme }) => theme.colors.gray900};
    }
    
    .notification-badge {
      position: absolute;
      top: 4px;
      right: 4px;
      background-color: ${({ theme }) => theme.colors.error};
      color: white;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 600;
    }
  }
  
  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primaryLighter};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryLight};
      transform: scale(1.05);
    }
  }
`;

const Content = styled(Container)`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  overflow-y: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndices.overlay - 1};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

// Componente de ícono de bombilla (logo)
const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Efecto para manejar el responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    
    // Verificar el tamaño inicial
    handleResize();
    
    // Agregar event listener para cambios de tamaño
    window.addEventListener('resize', handleResize);
    
    // Limpiar event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Estado para el archivo cargado
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<DataPoint[]>([]);
  const [columnTypes, setColumnTypes] = useState<Record<string, DataType>>({});
  const [isLoading, setIsLoading] = useState(false);

  const detectType = (value: any): DataType => {
    if (value === null || value === undefined || value === '') return 'string';
    
    // Check for date
    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
      return 'date';
    }
    
    // Check for number
    if (!isNaN(Number(value)) && value !== '') {
      return 'number';
    }
    
    // Check for boolean
    if (value === 'true' || value === 'false' || value === true || value === false) {
      return 'boolean';
    }
    
    // Check if it's a categorical string (enclosed in quotes or contains letters)
    if (typeof value === 'string' && (value.includes('"') || value.includes("'") || /[a-zA-Z]/.test(value))) {
      return 'categorical';
    }
    
    // Default to string
    return 'string';
  };

  const parseCSV = (text: string): DataPoint[] => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const row: DataPoint = {};
      
      headers.forEach((header, index) => {
        const value = values[index];
        
        // Convert empty strings to null
        if (value === '') {
          row[header] = null;
          return;
        }
        
        // Try to parse value based on detected type
        const type = detectType(value);
        
        switch (type) {
          case 'number':
            row[header] = Number(value);
            break;
          case 'boolean':
            row[header] = value === 'true' || (typeof value === 'boolean' && value);
            break;
          case 'date':
            row[header] = new Date(value);
            break;
          default:
            row[header] = value;
        }
      });
      
      return row;
    });
  };

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    
    try {
      const text = await file.text();
      const data = parseCSV(text);
      
      if (data.length > 0) {
        // Detect column types from first row
        const firstRow = data[0];
        const types: Record<string, DataType> = {};
        
        Object.entries(firstRow).forEach(([key, value]) => {
          types[key] = detectType(value);
        });
        
        setFileData(data);
        setColumnTypes(types);
        setUploadedFile(file);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  // Navegación
  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Panel Principal',
      icon: <DashboardIcon />,
      component: (
        <div style={{ color: 'white' }}>
          <h1 style={{ color: 'white', marginBottom: '16px' }}>Bienvenido a Lumina</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Comienza cargando tus datos o selecciona una opción del menú para continuar.
          </p>
          
          <div style={{ margin: '2rem 0' }}>
            <FileUpload 
              onFileUpload={handleFileUpload}
              isLoading={isLoading}
            />
          </div>
          
          {uploadedFile && (
            <div style={{ margin: '2rem 0' }}>
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>¿Qué te gustaría hacer a continuación?</h2>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '1.5rem',
                marginTop: '1.5rem'
              }}>
                <Card hoverEffect>
                  <h3>Análisis Univariado</h3>
                  <p>Analiza una sola variable a la vez para entender su distribución y estadísticas.</p>
                  <Button 
                    variant="primary" 
                    style={{ marginTop: '1rem' }}
                    onClick={() => setActiveView('univariate')}
                  >
                    Comenzar
                  </Button>
                </Card>
                
                <Card hoverEffect>
                  <h3>Análisis Bivariado</h3>
                  <p>Explora la relación entre dos variables para identificar patrones y correlaciones.</p>
                  <Button 
                    variant="primary" 
                    style={{ marginTop: '1rem' }}
                    onClick={() => setActiveView('bivariate')}
                  >
                    Comenzar
                  </Button>
                </Card>
              </div>
            </div>
          )}
          
          <div style={{ margin: '2rem 0' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Otras opciones</h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '1.5rem'
            }}>
              <Card hoverEffect>
                <h3>Reportes</h3>
                <p>Accede a informes guardados y genera nuevos informes personalizados.</p>
                <Button 
                  variant="outline" 
                  style={{ marginTop: '1rem' }}
                  onClick={() => setActiveView('reports')}
                >
                  Ver reportes
                </Button>
              </Card>
              
              {uploadedFile && (
                <Card hoverEffect>
                  <h3>Vista previa de datos</h3>
                  <p>Explora una vista previa de los datos cargados antes de realizar análisis.</p>
                  <Button 
                    variant="outline" 
                    style={{ marginTop: '1rem' }}
                    onClick={() => setActiveView('preview')}
                  >
                    Ver datos
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'univariate',
      label: 'Análisis Univariado',
      icon: <UnivariateIcon />,
      component: (
        <div style={{ padding: '1.5rem' }}>
          {uploadedFile && fileData.length > 0 ? (
            <UnivariateAnalysis 
              data={fileData} 
              columnTypes={columnTypes} 
            />
          ) : (
            <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
              <h2>Por favor, carga un archivo primero</h2>
              <p style={{ margin: '1rem 0 2rem' }}>Necesitas cargar un archivo para realizar el análisis univariado.</p>
              <FileUpload 
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      )
    },
    {
      id: 'bivariate',
      label: 'Análisis Bivariado',
      icon: <BivariateIcon />,
      component: (
        <div style={{ color: 'white' }}>
          <h1 style={{ 
            color: 'white', 
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 600
          }}>Análisis Bivariado</h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '1.1rem', 
            marginBottom: '1.5rem' 
          }}>Selecciona dos variables para analizar su relación.</p>
          <Card style={{ marginTop: '1.5rem', minHeight: '400px' }}>
            <p>Contenido del análisis bivariado...</p>
          </Card>
        </div>
      )
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: <ReportsIcon />,
      component: (
        <div style={{ color: 'white' }}>
          <h1 style={{ 
            color: 'white', 
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 600
          }}>Reportes</h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '1.1rem', 
            marginBottom: '1.5rem' 
          }}>Gestiona y visualiza tus informes guardados.</p>
          <Card style={{ marginTop: '1.5rem', minHeight: '400px' }}>
            <p>Contenido de reportes...</p>
          </Card>
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: <SettingsIcon />,
      component: (
        <div style={{ color: 'white' }}>
          <h1 style={{ 
            color: 'white', 
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: 600
          }}>Configuración</h1>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.9)', 
            fontSize: '1.1rem', 
            marginBottom: '1.5rem' 
          }}>Personaliza la aplicación a tus preferencias.</p>
          <Card style={{ marginTop: '1.5rem', padding: '2rem' }}>
            <h3 style={{ 
              color: 'white', 
              marginBottom: '1rem',
              fontSize: '1.5rem',
              fontWeight: 600
            }}>Preferencias de la cuenta</h3>
            <div style={{ marginTop: '1.5rem' }}>
              <p>Configuración de notificaciones, temas y más.</p>
            </div>
          </Card>
        </div>
      )
    }
  ];
  
  // Obtener el componente activo
  const activeComponent = navItems.find(item => item.id === activeView)?.component;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        {/* Overlay para móvil */}
        <Overlay 
          $isOpen={sidebarOpen && isMobile} 
          onClick={() => setSidebarOpen(false)}
        />
        
        {/* Sidebar */}
        <Sidebar $isOpen={sidebarOpen}>
          <Logo>
            <LightbulbIcon />
            <h1>Lumina</h1>
          </Logo>
          
          <Nav>
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a 
                    href={`#${item.id}`}
                    className={activeView === item.id ? 'active' : ''}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveView(item.id);
                      if (isMobile) setSidebarOpen(false);
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Nav>
        </Sidebar>
        
        {/* Contenido principal */}
        <MainContent $sidebarOpen={sidebarOpen}>
          <TopBar>
            <MenuButton 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <MenuIcon />
            </MenuButton>
            
            <h2 style={{
              color: 'white',
              border: '1px solid white',
              borderRadius: '20px',
              padding: '8px 16px',
              margin: 0,
              fontSize: '1rem',
              fontWeight: 500,
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              {navItems.find(item => item.id === activeView)?.label}
            </h2>
            
            <TopBarActions>
              <button aria-label="Notificaciones">
                <NotificationsIcon />
                <span className="notification-badge">3</span>
              </button>
              
              <div className="user-avatar" onClick={() => setActiveView('settings')}>
                <UserIcon />
              </div>
            </TopBarActions>
          </TopBar>
          
          <Content>
            {activeComponent}
          </Content>
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
