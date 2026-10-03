import { DataType, ChartType, DataPoint } from '../types';

export interface UseUnivariateAnalysisProps {
  data: DataPoint[];
  columnTypes: Record<string, DataType>;
}

export interface Variable {
  name: string;
  type: DataType;
}

export interface ChartOption {
  id: ChartType;
  label: string;
}

export interface UseUnivariateAnalysisReturn {
  selectedVariable: string;
  dataType: DataType;
  activeChart: ChartType;
  filteredVariables: Variable[];
  stats: any; // TODO: Mejorar tipado de stats
  currentChartOptions: any; // TODO: Mejorar tipado
  availableChartTypes: ChartOption[];
  handleDataTypeChange: (type: DataType) => void;
  handleVariableChange: (variable: string) => void;
  handleChartTypeChange: (type: ChartType) => void;
}
