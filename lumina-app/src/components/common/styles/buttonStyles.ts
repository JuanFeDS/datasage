import { css } from 'styled-components';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

export const buttonVariants = {
  primary: css`
    background: linear-gradient(135deg, #4f6bff 0%, #3a55c0 100%);
    color: white;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    font-weight: 600;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #5d75ff 0%, #4a63e0 100%);
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: -1;
    }
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      
      &::before {
        opacity: 1;
      }
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  `,
  
  secondary: css`
    background: rgba(255, 255, 255, 0.9);
    color: #1a1a2e;
    border: 1px solid rgba(255, 255, 255, 0.95);
    font-weight: 600;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background: white;
      border-color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `,
  
  outline: css`
    background: transparent;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.8);
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.1);
      border-color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `,
  
  ghost: css`
    background: transparent;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      transform: translateY(-2px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      background: rgba(255, 255, 255, 0.1);
    }
  `,
  
  danger: css`
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    font-weight: 600;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    z-index: 1;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: -1;
    }
    
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
      
      &::before {
        opacity: 1;
      }
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
    }
  `
};

export const getButtonSize = (size: ButtonSize = 'md') => {
  switch (size) {
    case 'sm':
      return css`
        font-size: 0.75rem;
        padding: 0.375rem 0.875rem;
        border-radius: 6px;
      `;
    case 'lg':
      return css`
        font-size: 1rem;
        padding: 0.75rem 1.75rem;
        border-radius: 10px;
        font-weight: 600;
      `;
    case 'md':
    default:
      return css`
        font-size: 0.875rem;
        padding: 0.5rem 1.25rem;
        border-radius: 8px;
      `;
  }
};
