import { useMemo } from 'react';
import { DataType, ChartType } from '../../types';
import { 
  generateDateChartOptions,
  generateNumericChartOptions,
  generateCategoricalChartOptions 
} from '../../utils/chartOptions';

export const useChartOptions = (selectedVariable: string, dataType: DataType, data: any[]) => {
  return useMemo(() => {
    if (!selectedVariable || data.length === 0) return null;
    
    const values = data
      .map(row => row[selectedVariable])
      .filter(val => val !== null && val !== undefined);
    
    try {
      const commonOptions = { values, selectedVariable };
      
      switch (dataType) {
        case 'number':
          return generateNumericChartOptions(commonOptions);
        case 'date':
          return generateDateChartOptions(commonOptions);
        case 'categorical':
        case 'boolean':
          return generateCategoricalChartOptions({ ...commonOptions, dataType });
        default:
          return null;
      }
    } catch (error) {
      console.error('Error generating chart options:', error);
      return null;
    }
  }, [selectedVariable, dataType, data]);
};

export const useAvailableChartTypes = (dataType: DataType) => {
  return useMemo(() => {
    switch(dataType) {
      case 'number':
        return [
          { id: 'distribucion' as const, label: 'Distribución' },
          { id: 'boxplot' as const, label: 'Box Plot' },
          { id: 'linea' as const, label: 'Línea' }
        ];
      case 'date':
        return [
          { id: 'linea' as const, label: 'Línea Temporal' },
          { id: 'barras' as const, label: 'Barras' }
        ];
      case 'categorical':
      case 'boolean':
        return [
          { id: 'barras' as const, label: 'Barras' },
          { id: 'circular' as const, label: 'Circular' }
        ];
      default:
        return [];
    }
  }, [dataType]);
};

export const useCurrentChartTypeOptions = (chartOptions: any, activeChart: ChartType) => {
  return useMemo(() => {
    if (!chartOptions) return null;
    
    switch(activeChart) {
      case 'distribucion':
        return chartOptions.histogramOptions;
      case 'boxplot':
        return chartOptions.boxPlotOptions;
      case 'linea':
        return chartOptions.lineChartOptions;
      case 'barras':
        return chartOptions.barOptions;
      case 'circular':
        return chartOptions.pieOptions;
      default:
        return null;
    }
  }, [activeChart, chartOptions]);
};
