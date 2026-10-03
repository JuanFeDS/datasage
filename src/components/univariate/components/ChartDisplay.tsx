import React from 'react';
import ReactECharts from 'echarts-for-react';
import { DataType, ChartType } from '../types';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background: #1e1e2d;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;

const ChartTitle = styled.h3`
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.125rem;
  font-weight: 500;
`;

const ChartWrapper = styled.div`
  flex: 1;
  min-height: 300px;
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #a1a1aa;
  font-size: 0.9rem;
`;

const getChartTitle = (dataType: DataType, activeChart: ChartType): string => {
  if (dataType === 'categorical' || dataType === 'boolean') {
    return activeChart === 'distribucion' ? 'Gráfico de Barras' : 'Gráfico Circular';
  } 
  
  if (dataType === 'date') {
    return 'Serie de Tiempo';
  }
  
  // For numeric data
  switch (activeChart) {
    case 'distribucion':
      return 'Histograma';
    case 'boxplot':
      return 'Box Plot';
    case 'linea':
      return 'Gráfico de Línea';
    default:
      return 'Gráfico';
  }
};

interface ChartDisplayProps {
  chartOptions: any;
  dataType: DataType;
  activeChart: ChartType;
  isLoading: boolean;
}

export const ChartDisplay: React.FC<ChartDisplayProps> = ({
  chartOptions,
  dataType,
  activeChart,
  isLoading
}) => {
  const chartTitle = getChartTitle(dataType, activeChart);

  return (
    <ChartContainer>
      <ChartTitle>{chartTitle}</ChartTitle>
      <ChartWrapper>
        {isLoading ? (
          <LoadingMessage>Cargando gráfico...</LoadingMessage>
        ) : chartOptions ? (
          <ReactECharts 
            option={chartOptions}
            style={{ height: '100%', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
            theme="dark"
            opts={{ renderer: 'svg' }}
          />
        ) : (
          <LoadingMessage>No hay datos disponibles para mostrar el gráfico</LoadingMessage>
        )}
      </ChartWrapper>
    </ChartContainer>
  );
};
