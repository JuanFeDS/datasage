import styled from 'styled-components';
import { theme } from '../../theme/theme';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: keyof typeof theme.breakpoints | string;
  paddingX?: keyof typeof theme.spacing | string;
  paddingY?: keyof typeof theme.spacing | string;
  className?: string;
}

const StyledContainer = styled.div<Omit<ContainerProps, 'children'>>`
  width: 100%;
  max-width: ${({ maxWidth = 'contentMaxWidth' }) => 
    typeof maxWidth === 'string' && !Object.keys(theme.breakpoints).includes(maxWidth as string)
      ? maxWidth
      : theme.breakpoints[maxWidth as keyof typeof theme.breakpoints] || theme.sizes.contentMaxWidth};
  margin: 0 auto;
  padding-left: ${({ paddingX = 4 }) => 
    typeof paddingX === 'string' && !Object.keys(theme.spacing).includes(paddingX as string)
      ? paddingX
      : theme.spacing[paddingX as keyof typeof theme.spacing]};
  padding-right: ${({ paddingX = 4 }) => 
    typeof paddingX === 'string' && !Object.keys(theme.spacing).includes(paddingX as string)
      ? paddingX
      : theme.spacing[paddingX as keyof typeof theme.spacing]};
  padding-top: ${({ paddingY = 6 }) => 
    typeof paddingY === 'string' && !Object.keys(theme.spacing).includes(paddingY as string)
      ? paddingY
      : theme.spacing[paddingY as keyof typeof theme.spacing]};
  padding-bottom: ${({ paddingY = 6 }) => 
    typeof paddingY === 'string' && !Object.keys(theme.spacing).includes(paddingY as string)
      ? paddingY
      : theme.spacing[paddingY as keyof typeof theme.spacing]};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding-left: ${theme.spacing[4]};
    padding-right: ${theme.spacing[4]};
    padding-top: ${theme.spacing[4]};
    padding-bottom: ${theme.spacing[4]};
  }
`;

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = 'contentMaxWidth',
  paddingX = 4,
  paddingY = 6,
  className,
}) => {
  return (
    <StyledContainer 
      maxWidth={maxWidth}
      paddingX={paddingX}
      paddingY={paddingY}
      className={className}
    >
      {children}
    </StyledContainer>
  );
};

export default Container;
