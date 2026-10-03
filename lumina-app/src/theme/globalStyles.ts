import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  /* Reset y estilos base */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    height: 100%;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    color: ${theme.colors.gray800};
    background: ${theme.colors.background};
    min-height: 100vh;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  
  /* Estilos de selección de texto */
  ::selection {
    background: ${theme.colors.primaryLightest};
    color: ${theme.colors.primaryDark};
  }
  
  /* Estilos de scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray100};
    border-radius: ${theme.radii.full};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray300};
    border-radius: ${theme.radii.full};
    transition: ${theme.transitions.default};
    
    &:hover {
      background: ${theme.colors.gray400};
    }
  }

  /* Tipografía mejorada */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${theme.spacing[4]} 0;
    font-weight: 700;
    line-height: 1.2;
    color: ${theme.colors.gray900};
    letter-spacing: -0.02em;
  }

  h1 { 
    font-size: ${theme.fontSizes['4xl']};
    line-height: 1.1;
    font-weight: 800;
    margin-bottom: ${theme.spacing[6]};
  }
  
  h2 { 
    font-size: ${theme.fontSizes['3xl']};
    font-weight: 700;
    margin-bottom: ${theme.spacing[5]};
  }
  
  h3 { 
    font-size: ${theme.fontSizes['2xl']};
    font-weight: 600;
    margin-bottom: ${theme.spacing[4]};
  }
  
  h4 { 
    font-size: ${theme.fontSizes.xl};
    font-weight: 600;
    margin-bottom: ${theme.spacing[3]};
  }
  
  h5 { 
    font-size: ${theme.fontSizes.lg};
    font-weight: 600;
    margin-bottom: ${theme.spacing[2]};
  }
  
  h6 { 
    font-size: ${theme.fontSizes.base};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: ${theme.colors.gray600};
    margin-bottom: ${theme.spacing[2]};
  }

  /* Párrafos y texto */
  p {
    margin: 0 0 ${theme.spacing[4]} 0;
    color: ${theme.colors.gray700};
    line-height: 1.6;
  }
  
  /* Enlaces */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease, background-color 0.2s ease;
    font-weight: 500;
    
    &:hover {
      color: ${theme.colors.primaryDark};
      text-decoration: underline;
    }
    
    &:focus-visible {
      outline: 2px solid ${theme.colors.primaryLight};
      outline-offset: 2px;
      border-radius: ${theme.radii.sm};
    }
  }
  
  /* Listas */
  ul, ol {
    margin: 0 0 ${theme.spacing[4]} ${theme.spacing[4]};
    padding: 0;
    
    li {
      margin-bottom: ${theme.spacing[2]};
      line-height: 1.6;
    }
  }
  
  /* Imágenes */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
  
  /* Formularios */
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  
  button,
  input {
    overflow: visible;
  }
  
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  
  /* Utilidades */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Contenedor principal */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Enlaces */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${theme.colors.primaryLight};
      text-decoration: underline;
    }
  }

  /* Listas */
  ul, ol {
    margin-bottom: ${theme.spacing[4]};
    padding-left: ${theme.spacing[6]};
  }

  /* Imágenes */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Formularios */
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  /* Utilidades */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray100};
  }

  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray400};
    border-radius: ${theme.radii.md};

    &:hover {
      background: ${theme.colors.gray500};
    }
  }
`;
