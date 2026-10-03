import styled from 'styled-components';
import { theme } from '../../theme/theme';
import { getCardStyles } from './styles/cardStyles';

export interface CardProps {
  children: React.ReactNode;
  padding?: keyof typeof theme.spacing | string;
  shadow?: keyof typeof theme.shadows | 'none';
  borderRadius?: keyof typeof theme.radii | string;
  backgroundColor?: keyof typeof theme.colors | string;
  hoverEffect?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const StyledCard = styled.div<Omit<CardProps, 'children'>>`
  ${props => getCardStyles({
    padding: props.padding,
    shadow: props.shadow,
    borderRadius: props.borderRadius,
    backgroundColor: props.backgroundColor,
    hoverEffect: props.hoverEffect,
  })}
`;

export const Card: React.FC<CardProps> = ({
  children,
  padding = 6,
  shadow = 'base',
  borderRadius = 'lg',
  backgroundColor = 'surface',
  hoverEffect = false,
  className,
  style,
}) => (
  <StyledCard
    padding={padding}
    shadow={shadow}
    borderRadius={borderRadius}
    backgroundColor={backgroundColor}
    hoverEffect={hoverEffect}
    className={className}
    style={style}
  >
    {children}
  </StyledCard>
);

export default Card;
