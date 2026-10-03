import { useState, useCallback, useEffect } from 'react';
import { DataType, ChartType } from '../../types';
import { Variable } from '../../types/useUnivariateAnalysisTypes';

interface UseVariableHandlersReturn {
  selectedVariable: string;
  dataType: DataType;
  activeChart: ChartType;
  handleDataTypeChange: (type: DataType) => void;
  handleVariableChange: (variable: string) => void;
  handleChartTypeChange: (type: ChartType) => void;
  setSelectedVariable: (variable: string) => void;
  setDataType: (type: DataType) => void;
  setActiveChart: (chart: ChartType) => void;
  updateFilteredVariables: (variables: Variable[]) => void;
}

export const useVariableHandlers = (initialFilteredVariables: Variable[] = []): UseVariableHandlersReturn => {
  const [selectedVariable, setSelectedVariable] = useState<string>('');
  const [dataType, setDataType] = useState<DataType>('number');
  const [activeChart, setActiveChart] = useState<ChartType>('distribucion');
  const [filteredVariables, setFilteredVariables] = useState<Variable[]>(initialFilteredVariables);

  // Handle data type change
  const handleDataTypeChange = useCallback((newDataType: DataType) => {
    setDataType(newDataType);
    setActiveChart('distribucion');
  }, []);
  
  // Handle variable change
  const handleVariableChange = useCallback((variable: string) => {
    setSelectedVariable(variable);
  }, []);
  
  // Handle chart type change
  const handleChartTypeChange = useCallback((type: ChartType) => {
    setActiveChart(type);
  }, []);

  // Update filtered variables
  const updateFilteredVariables = useCallback((newFilteredVariables: Variable[]) => {
    setFilteredVariables(newFilteredVariables);
    
    // Reset selected variable if it's no longer in the filtered list
    if (selectedVariable && !newFilteredVariables.some(v => v.name === selectedVariable)) {
      setSelectedVariable(newFilteredVariables[0]?.name || '');
    }
  }, [selectedVariable]);
  
  // Set initial variable when data loads or data type changes
  useEffect(() => {
    if (filteredVariables.length > 0 && !selectedVariable) {
      setSelectedVariable(filteredVariables[0].name);
    } else if (filteredVariables.length === 0) {
      setSelectedVariable('');
    } else if (!filteredVariables.some(v => v.name === selectedVariable)) {
      setSelectedVariable(filteredVariables[0]?.name || '');
    }
  }, [filteredVariables, selectedVariable]);

  return {
    selectedVariable,
    dataType,
    activeChart,
    handleDataTypeChange,
    handleVariableChange,
    handleChartTypeChange,
    setSelectedVariable,
    setDataType,
    setActiveChart,
    updateFilteredVariables
  };
};
