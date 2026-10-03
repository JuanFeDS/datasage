export type ChartType = 'distribucion' | 'boxplot' | 'linea' | 'barras' | 'circular';
export type DataType = 'number' | 'string' | 'date' | 'boolean' | 'categorical';

export interface Variable {
  name: string;
  type: DataType;
}

export interface DataPoint {
  [key: string]: string | number | boolean | Date | null;
}

export interface ChartOptions {
  histogramOptions?: any;
  boxPlotOptions?: any;
  lineChartOptions?: any;
  pieOptions?: any;
  barOptions?: any;
  data: Record<string, (string | number | boolean | Date | null)[]>;
}

export interface Stats {
  media: number;
  mediana: number;
  moda: number | string | null;
  desviacion: number;
  minimo: number | string | null;
  maximo: number | string | null;
  count: number;
}

export interface UnivariateAnalysisProps {
  data: DataPoint[];
  columnTypes: Record<string, DataType>;
}

export interface VariableSelectorProps {
  dataType: DataType;
  selectedVariable: string;
  filteredVariables: Variable[];
  onDataTypeChange: (type: DataType) => void;
  onVariableChange: (variable: string) => void;
}

export interface StatsDisplayProps {
  stats: Stats | null;
}

export interface ChartTypeSelectorProps {
  activeChart: ChartType;
  availableChartTypes: Array<{id: string, label: string}>;
  onChartTypeChange: (type: ChartType) => void;
}

export interface ChartDisplayProps {
  chartOptions: any;
  dataType: DataType;
  activeChart: ChartType;
  isLoading: boolean;
}
