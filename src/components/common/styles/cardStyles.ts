import { css } from 'styled-components';
import { theme } from '../../../theme/theme';

type CardStyleProps = {
  padding?: keyof typeof theme.spacing | string;
  shadow?: keyof typeof theme.shadows | 'none';
  borderRadius?: keyof typeof theme.radii | string;
  backgroundColor?: keyof typeof theme.colors | string;
  hoverEffect?: boolean;
};

export const getCardStyles = ({
  padding = 6,
  shadow = 'base',
  borderRadius = 'lg',
  backgroundColor = 'surface',
  hoverEffect = false,
}: CardStyleProps) => css`
  background: ${theme.colors[backgroundColor as keyof typeof theme.colors] || backgroundColor};
  border-radius: ${theme.radii[borderRadius as keyof typeof theme.radii] || borderRadius};
  box-shadow: ${theme.shadows[shadow as keyof typeof theme.shadows] || shadow};
  padding: ${typeof padding === 'string' && !Object.keys(theme.spacing).includes(padding as string)
    ? padding
    : theme.spacing[padding as keyof typeof theme.spacing]};
  transition: ${theme.transitions.default};
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  ${hoverEffect && css`
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `}
`;
