import { EChartsOption } from 'echarts';

export interface ChartData {
  [key: string]: any[];
}

export type ChartOptions = EChartsOption;

export interface DateChartOptions {
  lineChartOptions: ChartOptions;
  data: ChartData;
}

export interface NumericChartOptions {
  histogramOptions: ChartOptions;
  boxPlotOptions: ChartOptions;
  lineChartOptions: ChartOptions;
  data: ChartData;
}

export interface CategoricalChartOptions {
  pieOptions: ChartOptions;
  barOptions: ChartOptions;
  data: ChartData;
}

export interface ChartGeneratorOptions {
  values: any[];
  selectedVariable: string;
  dataType?: DataType;
}

export type DataType = 'number' | 'date' | 'categorical' | 'boolean';
