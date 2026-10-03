import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { buttonVariants, getButtonSize } from './styles/buttonStyles';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
}

const StyledButton = styled.button<Omit<ButtonProps, 'children'>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  line-height: 1.5;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  backdrop-filter: blur(5px);
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
  
  /* Variants */
  ${({ variant = 'primary' }) => buttonVariants[variant]}
  
  /* Sizes */
  ${({ size = 'md' }) => getButtonSize(size)}
  
  /* Full width */
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
  
  /* Loading state */
  ${({ isLoading }) =>
    isLoading &&
    css`
      position: relative;
      color: transparent !important;
      pointer-events: none;

      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    `}

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const IconWrapper = styled.span<{ position: 'left' | 'right' }>`
  display: inline-flex;
  align-items: center;
  margin-${({ position }) => position === 'left' ? 'right' : 'left'}: 8px;
`;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => (
  <StyledButton
    variant={variant}
    size={size}
    fullWidth={fullWidth}
    disabled={disabled || isLoading}
    isLoading={isLoading}
    {...props}
  >
    {isLoading ? (
      <span>Loading...</span>
    ) : (
      <>
        {leftIcon && <IconWrapper position="left">{leftIcon}</IconWrapper>}
        {children}
        {rightIcon && <IconWrapper position="right">{rightIcon}</IconWrapper>}
      </>
    )}
  </StyledButton>
);

Button.displayName = 'Button';

export default Button;
