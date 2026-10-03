import React from 'react';
import { Stats } from '../types';
import styled from 'styled-components';

const StatsCard = styled.div`
  background: #1e1e2d;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const StatItem = styled.div`
  background: #2d2d3d;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #a1a1aa;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
`;

const EmptyState = styled.div`
  color: #999;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
`;

interface StatsDisplayProps {
  stats: Stats | null;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  if (!stats) {
    return (
      <StatsCard>
        <h3>Estadísticas Descriptivas</h3>
        <EmptyState>Selecciona una variable para ver las estadísticas</EmptyState>
      </StatsCard>
    );
  }

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') return value.toFixed(2);
    return String(value);
  };

  return (
    <StatsCard>
      <h3>Estadísticas Descriptivas</h3>
      <StatsGrid>
        <StatItem>
          <StatLabel>Media</StatLabel>
          <StatValue>{formatValue(stats.media)}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Mediana</StatLabel>
          <StatValue>{formatValue(stats.mediana)}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Moda</StatLabel>
          <StatValue>{formatValue(stats.moda)}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Desviación</StatLabel>
          <StatValue>{formatValue(stats.desviacion)}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Mínimo</StatLabel>
          <StatValue>{formatValue(stats.minimo)}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Máximo</StatLabel>
          <StatValue>{formatValue(stats.maximo)}</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Registros</StatLabel>
          <StatValue>{stats.count}</StatValue>
        </StatItem>
      </StatsGrid>
    </StatsCard>
  );
};
