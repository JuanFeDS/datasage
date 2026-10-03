import { useMemo } from 'react';
import { DataType, Variable, DataPoint } from '../types';
import { UseUnivariateAnalysisProps, UseUnivariateAnalysisReturn } from '../types/useUnivariateAnalysisTypes';
import { useVariableHandlers } from './utils/useVariableHandlers';
import { useChartOptions, useAvailableChartTypes, useCurrentChartTypeOptions } from './utils/useChartOptions';
import { useStatsCalculator } from './utils/useStatsCalculator';

export const useUnivariateAnalysis = ({ 
  data, 
  columnTypes 
}: UseUnivariateAnalysisProps): UseUnivariateAnalysisReturn => {
  // Generate variables from column types
  const variables = useMemo<Variable[]>(() => {
    return Object.entries(columnTypes).map(([name, type]) => ({
      name,
      type: (type.toLowerCase() as DataType) || 'string'
    }));
  }, [columnTypes]);

  // Handle variable and chart state
  const {
    selectedVariable,
    dataType,
    activeChart,
    handleDataTypeChange,
    handleVariableChange,
    handleChartTypeChange,
    updateFilteredVariables
  } = useVariableHandlers();

  // Filter variables by selected data type and update handlers
  const filteredVariables = useMemo(() => {
    const filtered = variables.filter(variable => variable.type === dataType);
    updateFilteredVariables(filtered);
    return filtered;
  }, [variables, dataType, updateFilteredVariables]);
  
  // Calculate statistics
  const stats = useStatsCalculator(selectedVariable, dataType, data);
  
  // Generate chart options
  const chartOptions = useChartOptions(selectedVariable, dataType, data);
  const availableChartTypes = useAvailableChartTypes(dataType);
  const currentChartTypeOptions = useCurrentChartTypeOptions(chartOptions, activeChart);

  return {
    selectedVariable,
    dataType,
    activeChart,
    filteredVariables,
    stats,
    currentChartOptions: currentChartTypeOptions,
    availableChartTypes,
    handleDataTypeChange,
    handleVariableChange,
    handleChartTypeChange
  };
};
