import React from 'react';
import { ChartType } from '../types';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 1.5rem;
`;

const Title = styled.h4`
  margin-bottom: 0.75rem;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

interface ButtonProps {
  active: boolean;
}

const Button = styled.button<ButtonProps>`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid ${props => props.active ? '#6366f1' : '#3f3f4d'};
  background: ${props => props.active ? 'rgba(99, 102, 241, 0.1)' : 'transparent'};
  color: ${props => props.active ? '#fff' : '#a1a1aa'};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #6366f1;
    color: #fff;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

interface ChartTypeSelectorProps {
  activeChart: ChartType;
  availableChartTypes: Array<{id: string, label: string}>;
  onChartTypeChange: (type: ChartType) => void;
}

export const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  activeChart,
  availableChartTypes,
  onChartTypeChange
}) => {
  if (availableChartTypes.length <= 1) return null;

  return (
    <Container>
      <Title>Tipo de gráfico</Title>
      <ButtonGroup>
        {availableChartTypes.map(({ id, label }) => (
          <Button
            key={id}
            active={activeChart === id}
            onClick={() => onChartTypeChange(id as ChartType)}
          >
            {label}
          </Button>
        ))}
      </ButtonGroup>
    </Container>
  );
};
