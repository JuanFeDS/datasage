export const theme = {
  colors: {
    // Azules principales
    primary: '#1D4ED8',
    primaryLight: '#3B82F6',
    primaryLighter: '#60A5FA',
    primaryLightest: '#DBEAFE',
    primaryDark: '#1E40AF',
    primaryDarker: '#1E3A8A',
    
    // Cafés y acentos cálidos
    secondary: '#5C4033',
    secondaryLight: '#8B5A2B',
    secondaryLighter: '#D2B48C',
    accent: '#D97706',
    accentLight: '#F59E0B',
    
    // Escala de grises mejorada
    white: '#FFFFFF',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray150: '#E5E7EB',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray850: '#1A1F2E',
    gray900: '#111827',
    black: '#000000',
    
    // Estados con mejor contraste
    success: '#10B981',
    successLight: '#34D399',
    successDark: '#059669',
    warning: '#F59E0B',
    warningLight: '#FBBF24',
    warningDark: '#D97706',
    error: '#EF4444',
    errorLight: '#F87171',
    errorDark: '#DC2626',
    info: '#3B82F6',
    infoLight: '#60A5FA',
    infoDark: '#2563EB',
    
    // Fondos y superficies
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceHover: 'rgba(0, 0, 0, 0.02)'
  },
  
  // Tipografía
  fontSizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // Espaciado
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
    32: '8rem',    // 128px
    40: '10rem',   // 160px
    48: '12rem',   // 192px
    56: '14rem',   // 224px
    64: '16rem',   // 256px
  },
  
  // Sombras mejoradas con más profundidad
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    base: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
    md: '0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.2)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
    outline: '0 0 0 3px rgba(29, 78, 216, 0.3)',
    'outline-success': '0 0 0 3px rgba(16, 185, 129, 0.3)',
    'outline-warning': '0 0 0 3px rgba(245, 158, 11, 0.3)',
    'outline-error': '0 0 0 3px rgba(239, 68, 68, 0.3)',
    none: 'none',
  },
  
  // Bordes y esquinas redondeadas
  radii: {
    none: '0',
    xs: '0.125rem', // 2px
    sm: '0.25rem',  // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',   // 8px
    lg: '0.75rem',  // 12px
    xl: '1rem',     // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem',   // 32px
    full: '9999px',
  },
  
  // Transiciones y animaciones
  transitions: {
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  },
  
  // Espaciado y dimensiones
  sizes: {
    header: '4rem',
    sidebar: '16rem',
    sidebarCollapsed: '5rem',
    container: '90rem',
    contentMaxWidth: '80rem',
  },
  
  // Z-index mejorado
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1050,
    banner: 1100,
    overlay: 1200,
    modal: 1300,
    popover: 1400,
    skipLink: 1500,
    toast: 1600,
    tooltip: 1700,
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
};

export type Theme = typeof theme;
